import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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

export type Field =
  | {
      name: string;
      label: string;
      kind: "text" | "textarea" | "number";
      required?: boolean;
      hint?: string;
    }
  | { name: string; label: string; kind: "select"; options: readonly string[] }
  | { name: string; label: string; kind: "list"; hint?: string }
  | { name: string; label: string; kind: "modules" };

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
    else out[f.name] = f.kind === "text" && f.name === "url" && !raw.trim() ? null : raw.trim();
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

  const save = useMutation({
    mutationFn: async () => {
      const payload = fromForm(fields, form);
      if (!String(payload["title"] ?? "").trim()) throw new Error("Title is required");
      if (hasSlug) payload["slug"] = slugify(String(payload["slug"] || payload["title"]));
      const q =
        editing === "new"
          ? supabase.from(table).insert(payload as never)
          : supabase
              .from(table)
              .update(payload as never)
              .eq("id", (editing as Row).id);
      const { error } = await q;
      if (error)
        throw new Error(
          error.code === "23505" ? "That web address (slug) is already used" : error.message,
        );
    },
    onSuccess: () => {
      toast.success("Saved");
      setEditing(null);
      qc.invalidateQueries({ queryKey: ["admin"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const setStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from(table)
        .update({ status } as never)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin"] }),
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Deleted");
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

      <div className="mt-6 overflow-hidden rounded-2xl border bg-card shadow-card">
        {list.isLoading && <p className="p-6 text-sm text-muted-foreground">Loading…</p>}
        {list.data?.length === 0 && (
          <p className="p-6 text-sm text-muted-foreground">Nothing here yet.</p>
        )}
        <ul className="divide-y">
          {list.data?.map((r) => (
            <li key={r.id} className="flex flex-wrap items-center gap-3 p-4">
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{r.title}</p>
                {"slug" in r && (
                  <p className="truncate font-mono text-xs text-muted-foreground">
                    /{String(r["slug"])}
                  </p>
                )}
              </div>
              <select
                aria-label="Status"
                value={r.status}
                onChange={(e) => setStatus.mutate({ id: r.id, status: e.target.value })}
                className={`h-8 rounded-md border px-2 text-xs font-semibold capitalize ${r.status === "published" ? "border-primary bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <Button size="icon" variant="ghost" aria-label="Edit" onClick={() => open(r)}>
                <Pencil />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                aria-label="Delete"
                onClick={() => setToDelete(r)}
              >
                <Trash2 className="text-destructive" />
              </Button>
            </li>
          ))}
        </ul>
      </div>

      <Dialog open={editing !== null} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editing === "new" ? "Add new" : "Edit"}</DialogTitle>
          </DialogHeader>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              save.mutate();
            }}
          >
            {allFields.map((f) => (
              <div key={f.name} className="space-y-1.5">
                <Label htmlFor={f.name}>{f.label}</Label>
                {f.kind === "select" ? (
                  <select
                    id={f.name}
                    value={form[f.name]}
                    onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                    className="h-9 w-full rounded-md border bg-background px-3 text-sm"
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
                  />
                ) : (
                  <Input
                    id={f.name}
                    type={f.kind === "number" ? "number" : "text"}
                    value={form[f.name]}
                    onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                  />
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
              <Button type="button" variant="outline" onClick={() => setEditing(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="hero" disabled={save.isPending}>
                {save.isPending ? "Saving…" : "Save"}
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
            <AlertDialogAction onClick={() => toDelete && remove.mutate(toDelete.id)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
