import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BookOpen,
  FolderGit2,
  Inbox,
  LayoutDashboard,
  LibraryBig,
  LogOut,
  Route as RouteIcon,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin — Sanidhya" }, { name: "robots", content: "noindex" }] }),
  component: AdminLayout,
});

const nav = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/courses", label: "Courses", icon: BookOpen },
  { to: "/admin/learning-paths", label: "Learning paths", icon: RouteIcon },
  { to: "/admin/projects", label: "Projects", icon: FolderGit2 },
  { to: "/admin/resources", label: "Resources", icon: LibraryBig },
  { to: "/admin/messages", label: "Messages", icon: Inbox },
] as const;

function AdminLayout() {
  const { user } = Route.useRouteContext();
  const qc = useQueryClient();
  const navigate = useNavigate();
  const role = useQuery({
    queryKey: ["is-admin", user.id],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("has_role", {
        _user_id: user.id,
        _role: "admin",
      });
      if (error) throw error;
      return Boolean(data);
    },
  });

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  if (role.isLoading) return <div className="p-10 text-muted-foreground">Loading…</div>;
  if (role.isError)
    return (
      <div className="mx-auto max-w-md px-5 py-24 text-center">
        <h1 className="text-2xl font-bold">Couldn’t verify admin access</h1>
        <p className="mt-2 text-muted-foreground">
          Check your connection and try again. Your admin session is still protected.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <Button variant="outline" onClick={() => role.refetch()}>
            Try again
          </Button>
          <Button variant="ghost" onClick={signOut}>
            Sign out
          </Button>
        </div>
      </div>
    );
  if (!role.data)
    return (
      <div className="mx-auto max-w-md px-5 py-24 text-center">
        <h1 className="text-2xl font-bold">No admin access</h1>
        <p className="mt-2 text-muted-foreground">This account isn’t an administrator.</p>
        <Button className="mt-6" variant="outline" onClick={signOut}>
          Sign out
        </Button>
      </div>
    );

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 md:flex-row md:px-6">
      <aside className="md:w-56 md:shrink-0">
        <nav className="flex gap-1 overflow-x-auto rounded-2xl border bg-card p-2 shadow-card md:sticky md:top-24 md:flex-col">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: "exact" in n }}
              className="flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
              activeProps={{ className: "bg-accent text-accent-foreground" }}
            >
              <n.icon className="h-4 w-4" />
              {n.label}
            </Link>
          ))}
          <button
            onClick={signOut}
            className="flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </nav>
      </aside>
      <div className="min-w-0 flex-1">
        <Outlet />
      </div>
    </div>
  );
}
