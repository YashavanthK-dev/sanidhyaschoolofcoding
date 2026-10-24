import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/admin/messages")({ component: Messages });

function Messages() {
  const qc = useQueryClient();
  const list = useQuery({
    queryKey: ["admin", "messages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
  const done = () => qc.invalidateQueries({ queryKey: ["admin"] });
  const markRead = useMutation({
    mutationFn: async ({ id, is_read }: { id: string; is_read: boolean }) => {
      await supabase.from("contact_messages").update({ is_read }).eq("id", id);
    },
    onSuccess: done,
  });
  const remove = useMutation({
    mutationFn: async (id: string) => {
      await supabase.from("contact_messages").delete().eq("id", id);
    },
    onSuccess: done,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold">Messages</h1>
      <div className="mt-6 space-y-3">
        {list.data?.length === 0 && (
          <p className="text-sm text-muted-foreground">No messages yet.</p>
        )}
        {list.data?.map((m) => (
          <article
            key={m.id}
            className={`rounded-2xl border bg-card p-5 shadow-card ${m.is_read ? "opacity-70" : "border-primary"}`}
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-semibold">{m.name}</p>
                <a href={`mailto:${m.email}`} className="text-sm text-primary">
                  {m.email}
                </a>
              </div>
              <span className="font-mono text-xs text-muted-foreground">
                {new Date(m.created_at).toLocaleString()}
              </span>
            </div>
            <p className="mt-3 whitespace-pre-wrap text-sm">{m.message}</p>
            <div className="mt-4 flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => markRead.mutate({ id: m.id, is_read: !m.is_read })}
              >
                {m.is_read ? "Mark unread" : "Mark read"}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => confirm("Delete this message?") && remove.mutate(m.id)}
              >
                <Trash2 className="text-destructive" /> Delete
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
