import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FileImage, ImagePlus, LoaderCircle, Pencil, Plus, Search, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  getContentImageUrl,
  CONTENT_MEDIA_BUCKET,
  isManagedContentImage,
} from "@/lib/content-media";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export type ContentTable = "courses" | "projects" | "learning_paths" | "resources";

type FieldBase = { name: string; label: string; required?: boolean; hint?: string };

export type Field =
  | (FieldBase & { kind: "text" | "textarea" | "number" })
  | (FieldBase & { kind: "select"; options: readonly string[] })
  | (FieldBase & { kind: "list" | "modules" | "image" });

type Row = Record<string, unknown> & { id: string; status: string; title: string };

const STATUSES = ["draft", "published", "archived"] as const;

export function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

// Modules are edited as text: "Module title: lesson one, lesson two" — one module per line.
export function modulesToText(m: unknown) {
  return ((m as { title: string; lessons: string[] }[]) ?? [])
    .map((x) => `${x.title}: ${x.lessons.join(", ")}`)
    .join("\n");
}
export function textToModules(t: string) {
  return t
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const [title, rest = ""] = l.split(/:(.*)/s);
      return {
        title: (title ?? "").trim(),
        lessons: rest
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean),
      };
    });
}

function toForm(fields: Field[], row?: Row) {
  const v: Record<string, string> = { status: (row?.status as string) ?? "draft" };
  for (const f of fields) {
    const val = row?.[f.name];
    if (f.kind === "list") v[f.name] = ((val as string[]) ?? []).join("\n");
    else if (f.kind === "modules") v[f.name] = modulesToText(val);
    else v[f.name] = val == null ? (f.kind === "select" ? (f.options[0] ?? "") : "") : String(val);
  }
  return v;
}

function fromForm(fields: Field[], v: Record<string, string>) {
  const out: Record<string, unknown> = { status: v["status"] };
  for (const f of fields) {
    const raw = v[f.name] ?? "";
    if (f.kind === "list")
      out[f.name] = raw
        .split(/\n|,/)
        .map((x) => x.trim())
        .filter(Boolean);
    else if (f.kind === "modules") out[f.name] = textToModules(raw);
    else if (f.kind === "number") out[f.name] = Number(raw) || 0;
    else
      out[f.name] =
        ["url", "repository_url", "demo_url"].includes(f.name) && !raw.trim() ? null : raw.trim();
  }
  return out;
}

export function ContentManager({
  table,
  title,
  fields,
  hasSlug = true,
}: {
  table: ContentTable;
  title: string;
  fields: Field[];
  hasSlug?: boolean;
}) {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Row | "new" | null>(null);
  const [form, setForm] = useState<Record<string, string>>({});
  const [toDelete, setToDelete] = useState<Row | null>(null);
  const [toPublish, setToPublish] = useState<Row | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!coverFile) {
      setCoverPreview(null);
      return;
    }
    const preview = URL.createObjectURL(coverFile);
    setCoverPreview(preview);
    return () => URL.revokeObjectURL(preview);
  }, [coverFile]);

  const list = useQuery({
    queryKey: ["admin", table],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .order("sort_order")
        .order("created_at");
      if (error) throw error;
      return data as unknown as Row[];
    },
  });

  const visibleRows = (list.data ?? []).filter((row) => {
    const query = search.trim().toLocaleLowerCase();
    const matchesSearch =
      !query ||
      [row.title, row.summary, row.slug].some((value) =>
        String(value ?? "")
          .toLocaleLowerCase()
          .includes(query),
      );
    return matchesSearch && (statusFilter === "all" || row.status === statusFilter);
  });

  function validateForm() {
    const nextErrors: Record<string, string> = {};
    for (const field of allFields) {
      const value = form[field.name] ?? "";
      if (field.required && !value.trim()) nextErrors[field.name] = `${field.label} is required.`;
      if (field.kind === "number" && value) {
        const number = Number(value);
        if (!Number.isFinite(number) || number < 0)
          nextErrors[field.name] = "Enter a number that is zero or greater.";
      }
      if (["url", "repository_url", "demo_url"].includes(field.name) && value.trim()) {
        try {
          const url = new URL(value.trim());
          if (url.protocol !== "https:" && url.protocol !== "http:") throw new Error();
        } catch {
          nextErrors[field.name] = "Enter a valid http or https link.";
        }
      }
    }
    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  const save = useMutation({
    mutationFn: async () => {
      let uploadedPath: string | null = null;
      const previousPath =
        editing === "new" ? null : String((editing as Row).cover_image_path ?? "");
      const payload = fromForm(fields, form);
      if (!String(payload["title"] ?? "").trim()) throw new Error("Title is required");
      if (hasSlug) payload["slug"] = slugify(String(payload["slug"] || payload["title"]));
      let previousImageCleanupFailed = false;
      try {
        if (coverFile) {
          const extensions: Record<string, string> = {
            "image/jpeg": "jpg",
            "image/png": "png",
            "image/webp": "webp",
          };
          const extension = extensions[coverFile.type];
          if (!extension) throw new Error("Choose a JPG, PNG, or WebP image.");
          if (coverFile.size > 5 * 1024 * 1024) throw new Error("Images must be 5 MB or smaller.");
          uploadedPath = `${table}/${crypto.randomUUID()}.${extension}`;
          const { error: uploadError } = await supabase.storage
            .from(CONTENT_MEDIA_BUCKET)
            .upload(uploadedPath, coverFile, {
              cacheControl: "3600",
              contentType: coverFile.type,
              upsert: false,
            });
          if (uploadError) {
            if (uploadError.message.toLowerCase().includes("bucket not found"))
              throw new Error(
                "Apply database migration 0002_content_media.sql to enable image uploads.",
              );
            throw uploadError;
          }
          payload["cover_image_path"] = uploadedPath;
        } else if ("cover_image_path" in payload) {
          payload["cover_image_path"] = form["cover_image_path"]?.trim() || null;
        }

        const q =
          editing === "new"
            ? supabase.from(table).insert(payload as never)
            : supabase
                .from(table)
                .update(payload as never)
                .eq("id", (editing as Row).id);
        const { error } = await q;
        if (error) {
          if (error.code === "23505") throw new Error("That web address (slug) is already used.");
          if (error.code === "PGRST204" || error.code === "42703")
            throw new Error(
              "Apply database migration 0002_content_media.sql before saving cover images.",
            );
          throw error;
        }

        const nextPath = String(payload["cover_image_path"] ?? "");
        if (
          previousPath &&
          previousPath !== nextPath &&
          isManagedContentImage(previousPath, table)
        ) {
          const { error: removeError } = await supabase.storage
            .from(CONTENT_MEDIA_BUCKET)
            .remove([previousPath]);
          if (removeError) {
            previousImageCleanupFailed = true;
            console.warn("Could not remove the previous cover image", removeError);
          }
        }
        return { previousImageCleanupFailed };
      } catch (error) {
        if (uploadedPath) {
          await supabase.storage.from(CONTENT_MEDIA_BUCKET).remove([uploadedPath]);
        }
        throw error;
      }
    },
    onSuccess: (result) => {
      if (result.previousImageCleanupFailed)
        toast.warning("Saved. The previous image could not be removed from storage.");
      else toast.success("Saved");
      setEditing(null);
      setCoverFile(null);
      setFieldErrors({});
      qc.invalidateQueries({ queryKey: ["admin"] });
    },
    onError: (e: Error) => toast.error(e.message || "Could not save this item."),
  });

  const setStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from(table)
        .update({ status } as never)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Visibility updated");
      qc.invalidateQueries({ queryKey: ["admin"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async ({ id, imagePath }: { id: string; imagePath: string }) => {
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw error;
      let imageCleanupFailed = false;
      if (imagePath && isManagedContentImage(imagePath, table)) {
        const { error: removeError } = await supabase.storage
          .from(CONTENT_MEDIA_BUCKET)
          .remove([imagePath]);
        if (removeError) {
          imageCleanupFailed = true;
          console.warn("Could not remove the deleted item's cover image", removeError);
        }
      }
      return { imageCleanupFailed };
    },
    onSuccess: (result) => {
      if (result.imageCleanupFailed)
        toast.warning("Deleted. The cover image could not be removed from storage.");
      else toast.success("Deleted");
      setToDelete(null);
      qc.invalidateQueries({ queryKey: ["admin"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const allFields: Field[] = [
    ...fields.slice(0, 1),
    ...(hasSlug
      ? [
          {
            name: "slug",
            label: "Web address (slug)",
            kind: "text",
            hint: "Leave empty to create it from the title",
          } as Field,
        ]
      : []),
    ...fields.slice(1),
    {
      name: "sort_order",
      label: "Display order",
      kind: "number",
      hint: "Lower numbers show first",
    },
  ];

  function open(row?: Row) {
    setForm(toForm(allFields, row));
    setCoverFile(null);
    setFieldErrors({});
    setEditing(row ?? "new");
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Button variant="hero" onClick={() => open()}>
          <Plus /> Add new
        </Button>
      </div>

      <div className="mt-6 rounded-2xl border bg-card p-4 shadow-card sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={`Search ${title.toLowerCase()}…`}
              aria-label={`Search ${title.toLowerCase()}`}
              className="pl-9"
            />
          </label>
          <select
            aria-label="Filter by status"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="h-9 rounded-md border bg-background px-3 text-sm capitalize"
          >
            <option value="all">All statuses</option>
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span>{visibleRows.length} shown</span>
          <span>
            {(list.data ?? []).filter((row) => row.status === "published").length} published
          </span>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border bg-card shadow-card">
        {list.isLoading && <p className="p-6 text-sm text-muted-foreground">Loading content…</p>}
        {list.isError && (
          <div className="flex flex-wrap items-center justify-between gap-3 p-6">
            <p className="text-sm text-destructive">Could not load this content.</p>
            <Button variant="outline" size="sm" onClick={() => list.refetch()}>
              Try again
            </Button>
          </div>
        )}
        {!list.isLoading && !list.isError && visibleRows.length === 0 && (
          <div className="p-8 text-center">
            <FileImage className="mx-auto h-8 w-8 text-muted-foreground/60" />
            <p className="mt-3 font-semibold">
              {(list.data ?? []).length === 0 ? "Nothing here yet" : "No matching content"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {(list.data ?? []).length === 0
                ? `Add your first ${title.toLowerCase()} item to get started.`
                : "Try a different search or status filter."}
            </p>
          </div>
        )}
        <ul className="divide-y">
          {visibleRows.map((row) => {
            const imageUrl = getContentImageUrl(String(row.cover_image_path ?? ""));
            return (
              <li key={row.id} className="flex flex-wrap items-center gap-4 p-4 sm:p-5">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt=""
                    className="h-16 w-24 shrink-0 rounded-lg border object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-16 w-24 shrink-0 items-center justify-center rounded-lg border border-dashed bg-muted/40 text-muted-foreground">
                    <FileImage className="h-5 w-5" />
                  </div>
                )}
                <div className="min-w-[12rem] flex-1">
                  <p className="truncate font-semibold">{row.title}</p>
                  {"slug" in row && (
                    <p className="mt-0.5 truncate font-mono text-xs text-muted-foreground">
                      /{String(row.slug)}
                    </p>
                  )}
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {String(row.summary ?? "No description added yet.")}
                  </p>
                </div>
                <select
                  aria-label={`Visibility for ${row.title}`}
                  value={row.status}
                  disabled={setStatus.isPending}
                  onChange={(event) => {
                    const status = event.target.value;
                    if (status === "published" && row.status !== "published") setToPublish(row);
                    else setStatus.mutate({ id: row.id, status });
                  }}
                  className={`h-9 rounded-md border px-2 text-xs font-semibold capitalize disabled:opacity-60 ${row.status === "published" ? "border-primary bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}
                >
                  {STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label={`Edit ${row.title}`}
                  onClick={() => open(row)}
                >
                  <Pencil />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label={`Delete ${row.title}`}
                  onClick={() => setToDelete(row)}
                >
                  <Trash2 className="text-destructive" />
                </Button>
              </li>
            );
          })}
        </ul>
      </div>

      <Dialog
        open={editing !== null}
        onOpenChange={(open) => {
          if (!open && !save.isPending) setEditing(null);
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {editing === "new" ? "Add" : "Edit"} {title.toLowerCase().replace(/s$/, "")}
            </DialogTitle>
          </DialogHeader>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (!validateForm()) return;
              save.mutate();
            }}
          >
            {allFields.map((f) => (
              <div key={f.name} className="space-y-1.5">
                <Label htmlFor={f.name}>
                  {f.label}
                  {f.required && <span className="ml-1 text-destructive">*</span>}
                </Label>
                {f.kind === "image" ? (
                  <div className="rounded-xl border border-dashed p-4">
                    {coverPreview || getContentImageUrl(form[f.name]) ? (
                      <div className="relative overflow-hidden rounded-lg border bg-muted">
                        <img
                          src={coverPreview ?? getContentImageUrl(form[f.name]) ?? ""}
                          alt=""
                          className="max-h-64 w-full object-contain"
                        />
                        <span className="absolute bottom-2 left-2 rounded-md bg-background/90 px-2 py-1 text-xs text-muted-foreground">
                          Cover preview
                        </span>
                      </div>
                    ) : (
                      <div className="flex min-h-36 flex-col items-center justify-center rounded-lg bg-muted/30 text-center">
                        <FileImage className="h-8 w-8 text-muted-foreground/60" />
                        <p className="mt-2 text-sm font-medium">No cover image selected</p>
                      </div>
                    )}
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <Label
                        htmlFor={`${f.name}-file`}
                        className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-md bg-secondary px-3 text-sm font-medium hover:bg-secondary/80"
                      >
                        <ImagePlus className="h-4 w-4" />
                        Choose image
                      </Label>
                      <Input
                        id={`${f.name}-file`}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="sr-only"
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          event.target.value = "";
                          if (!file) return;
                          if (!new Set(["image/jpeg", "image/png", "image/webp"]).has(file.type)) {
                            toast.error("Choose a JPG, PNG, or WebP image.");
                            return;
                          }
                          if (file.size > 5 * 1024 * 1024) {
                            toast.error("Images must be 5 MB or smaller.");
                            return;
                          }
                          setCoverFile(file);
                          setForm((current) => ({ ...current, [f.name]: current[f.name] ?? "" }));
                        }}
                      />
                      {(coverFile || form[f.name]) && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setCoverFile(null);
                            setForm((current) => ({ ...current, [f.name]: "" }));
                          }}
                        >
                          <X className="h-4 w-4" /> Remove image
                        </Button>
                      )}
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      JPG, PNG, or WebP · up to 5 MB. Public pages can display covers; only admins
                      can upload, replace, or remove them.
                    </p>
                  </div>
                ) : f.kind === "select" ? (
                  <select
                    id={f.name}
                    value={form[f.name]}
                    onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                    aria-invalid={Boolean(fieldErrors[f.name])}
                    className="h-9 w-full rounded-md border bg-background px-3 text-sm aria-[invalid=true]:border-destructive"
                  >
                    {f.options.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                ) : f.kind === "textarea" || f.kind === "list" || f.kind === "modules" ? (
                  <Textarea
                    id={f.name}
                    rows={f.kind === "modules" ? 6 : 3}
                    value={form[f.name]}
                    onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                    required={f.kind === "textarea" && f.required}
                    aria-invalid={Boolean(fieldErrors[f.name])}
                    className="aria-[invalid=true]:border-destructive"
                  />
                ) : (
                  <Input
                    id={f.name}
                    type={f.kind === "number" ? "number" : f.name === "url" ? "url" : "text"}
                    min={f.kind === "number" ? 0 : undefined}
                    value={form[f.name]}
                    onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                    required={f.kind !== "number" && f.required}
                    aria-invalid={Boolean(fieldErrors[f.name])}
                    className="aria-[invalid=true]:border-destructive"
                  />
                )}
                {fieldErrors[f.name] && (
                  <p id={`${f.name}-error`} role="alert" className="text-xs text-destructive">
                    {fieldErrors[f.name]}
                  </p>
                )}
                {"hint" in f && f.hint && <p className="text-xs text-muted-foreground">{f.hint}</p>}
                {f.kind === "list" && !("hint" in f && f.hint) && (
                  <p className="text-xs text-muted-foreground">One per line</p>
                )}
                {f.kind === "modules" && (
                  <p className="text-xs text-muted-foreground">
                    One module per line — Module name: lesson, lesson, lesson
                  </p>
                )}
              </div>
            ))}
            <div className="space-y-1.5">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={form["status"]}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="h-9 w-full rounded-md border bg-background px-3 text-sm capitalize"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <p className="text-xs text-muted-foreground">
                Only "published" items appear on the website.
              </p>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditing(null)}
                disabled={save.isPending}
              >
                Cancel
              </Button>
              <Button type="submit" variant="hero" disabled={save.isPending}>
                {save.isPending ? (
                  <>
                    <LoaderCircle className="animate-spin" /> Saving…
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={toDelete !== null} onOpenChange={(o) => !o && setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete "{toDelete?.title}"?</AlertDialogTitle>
            <AlertDialogDescription>
              This can't be undone. To just hide it, set it to Draft or Archived instead.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={remove.isPending}
              onClick={() =>
                toDelete &&
                remove.mutate({
                  id: toDelete.id,
                  imagePath: String(toDelete.cover_image_path ?? ""),
                })
              }
            >
              {remove.isPending ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={toPublish !== null} onOpenChange={(open) => !open && setToPublish(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Publish "{toPublish?.title}"?</AlertDialogTitle>
            <AlertDialogDescription>
              Published content becomes visible on the public website immediately. Check its title,
              description, and cover image before continuing.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep as draft</AlertDialogCancel>
            <AlertDialogAction
              disabled={setStatus.isPending}
              onClick={() => {
                if (toPublish) setStatus.mutate({ id: toPublish.id, status: "published" });
                setToPublish(null);
              }}
            >
              {setStatus.isPending ? "Publishing…" : "Publish"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
