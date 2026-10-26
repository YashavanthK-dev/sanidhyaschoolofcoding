import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/")({ component: Overview });

const tables = [
  { t: "courses", label: "Courses", to: "/admin/courses" },
  { t: "learning_paths", label: "Learning paths", to: "/admin/learning-paths" },
  { t: "projects", label: "Projects", to: "/admin/projects" },
  { t: "resources", label: "Resources", to: "/admin/resources" },
] as const;

function Overview() {
  const stats = useQuery({
    queryKey: ["admin", "stats"],
    queryFn: async () => {
      const counts = await Promise.all(
        tables.map(async ({ t }) => {
          const [all, pub] = await Promise.all([
            supabase.from(t).select("id", { count: "exact", head: true }),
            supabase.from(t).select("id", { count: "exact", head: true }).eq("status", "published"),
          ]);
          if (all.error) throw all.error;
          if (pub.error) throw pub.error;
          return { total: all.count ?? 0, published: pub.count ?? 0 };
        }),
      );
      const unread = await supabase
        .from("contact_messages")
        .select("id", { count: "exact", head: true })
        .eq("is_read", false);
      if (unread.error) throw unread.error;
      return { counts, unread: unread.count ?? 0 };
    },
    refetchInterval: 30_000,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold">Overview</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Drafts stay private. Publishing makes content visible on the public website.
      </p>
      {stats.isError && (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4">
          <p className="text-sm text-destructive">
            Dashboard counts couldn’t load. Your content is unchanged.
          </p>
          <button
            type="button"
            onClick={() => stats.refetch()}
            className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            Try again
          </button>
        </div>
      )}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tables.map((x, i) => (
          <Link
            key={x.t}
            to={x.to}
            className="rounded-2xl border bg-card p-5 shadow-card hover:shadow-elegant"
          >
            <p className="text-sm text-muted-foreground">{x.label}</p>
            <p className="mt-2 font-display text-3xl font-bold">
              {stats.data?.counts[i]?.total ?? "–"}
            </p>
            <p className="text-xs text-muted-foreground">
              {stats.data?.counts[i]?.published ?? 0} published
            </p>
          </Link>
        ))}
        <Link
          to="/admin/messages"
          className="rounded-2xl border bg-card p-5 shadow-card hover:shadow-elegant"
        >
          <p className="text-sm text-muted-foreground">Unread messages</p>
          <p className="mt-2 font-display text-3xl font-bold text-primary">
            {stats.data?.unread ?? "–"}
          </p>
        </Link>
      </div>
    </div>
  );
}
