import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Admin sign in — Sanidhya School of Coding" },
      { name: "description", content: "Sign in to manage Sanidhya content." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email")).trim();
    const password = String(f.get("password"));
    setBusy(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.user) {
      setBusy(false);
      toast.error(error?.message ?? "Unable to sign in.");
      return;
    }

    const { data: isAdmin, error: roleError } = await supabase.rpc("has_role", {
      _user_id: data.user.id,
      _role: "admin",
    });

    setBusy(false);
    if (roleError || !isAdmin) {
      await supabase.auth.signOut();
      toast.error("This account is not approved for admin access.");
      return;
    }

    navigate({ to: "/admin" });
  }

  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-gradient-soft px-5">
      <form
        onSubmit={submit}
        className="w-full max-w-sm space-y-5 rounded-2xl border bg-card p-7 shadow-card"
      >
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-primary">Admin</p>
          <h1 className="mt-2 text-2xl font-bold">Sign in</h1>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required maxLength={255} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required minLength={8} />
        </div>
        <Button type="submit" variant="hero" className="w-full" disabled={busy}>
          {busy ? "Please wait…" : "Sign in"}
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Admin access is limited to approved accounts.
        </p>
      </form>
    </section>
  );
}
