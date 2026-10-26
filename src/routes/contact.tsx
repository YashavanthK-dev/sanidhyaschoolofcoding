import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { contactSchema as schema, sendMessage } from "@/lib/content.functions";
import { toast } from "sonner";
import { PageHeader } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { socialLinks } from "@/content/social-links";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Sanidhya School of Coding" },
      {
        name: "description",
        content: "Questions about courses or collaborations? Get in touch with Sanidhya.",
      },
      { property: "og:title", content: "Contact Sanidhya School of Coding" },
      {
        property: "og:description",
        content: "Questions about courses or collaborations? Get in touch.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const send = useServerFn(sendMessage);
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Say hello"
        intro="Questions about a course, a project idea or a collaboration? Send a message."
      />
      <section className="mx-auto max-w-5xl px-5 py-12">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <form
            className="space-y-5 rounded-2xl border bg-card p-6 shadow-card"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const r = schema.safeParse(Object.fromEntries(new FormData(form)));
              if (!r.success) {
                setErrors(
                  Object.fromEntries(r.error.issues.map((i) => [String(i.path[0]), i.message])),
                );
                return;
              }
              setErrors({});
              setSending(true);
              const res = await send({ data: r.data }).catch(() => ({ ok: false }));
              setSending(false);
              if (!res.ok) {
                toast.error("Could not send right now. Please try again.");
                return;
              }
              form.reset();
              toast.success("Thanks! Your message has been sent.");
            }}
          >
            {(["name", "email"] as const).map((f) => (
              <div key={f} className="space-y-1.5">
                <Label htmlFor={f} className="capitalize">
                  {f}
                </Label>
                <Input id={f} name={f} type={f === "email" ? "email" : "text"} />
                {errors[f] && <p className="text-sm text-destructive">{errors[f]}</p>}
              </div>
            ))}
            <div className="space-y-1.5">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" rows={5} />
              {errors["message"] && <p className="text-sm text-destructive">{errors["message"]}</p>}
            </div>
            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={sending}>
              {sending ? "Sending…" : "Send message"}
            </Button>
          </form>
          <aside className="rounded-2xl border bg-secondary/35 p-6 md:p-8">
            <p className="font-mono text-xs uppercase tracking-widest text-primary">
              Stay connected
            </p>
            <h2 className="mt-2 text-2xl font-bold">Join us around the web.</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Follow Sanidhya for new projects, coding videos, learning notes, and updates.
            </p>
            <div className="mt-6 space-y-2">
              {socialLinks.map(({ label, href, icon: SocialIcon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border bg-card px-4 py-3 text-sm font-medium transition-colors hover:border-primary/50 hover:bg-accent/50"
                >
                  <span className="flex items-center gap-3">
                    <SocialIcon className="h-4 w-4 text-primary" />
                    {label}
                  </span>
                  <span aria-hidden="true" className="text-muted-foreground">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
