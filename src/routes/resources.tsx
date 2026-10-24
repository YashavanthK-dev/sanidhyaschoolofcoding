import { createFileRoute } from "@tanstack/react-router";
import { FileText, Newspaper, PlayCircle, ScrollText } from "lucide-react";
import { listResources } from "@/lib/content.functions";
import { PageHeader } from "@/components/site-chrome";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources — Sanidhya School of Coding" },
      { name: "description", content: "Free notes, cheatsheets, articles and video lessons." },
      { property: "og:title", content: "Resources — Sanidhya School of Coding" },
      {
        property: "og:description",
        content: "Free notes, cheatsheets, articles and video lessons.",
      },
    ],
  }),
  loader: () => listResources(),
  component: Resources,
});

const icons: Record<string, typeof FileText> = {
  Notes: FileText,
  Article: Newspaper,
  Cheatsheet: ScrollText,
  Video: PlayCircle,
};

function Resources() {
  const resources = Route.useLoaderData();
  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="Notes, guides & videos"
        intro="Free material to learn faster and revise smarter."
      />
      <section className="mx-auto grid max-w-6xl gap-4 px-5 py-12 md:grid-cols-2">
        {resources.map((r) => {
          const Icon = icons[r.type] ?? FileText;
          return (
            <article
              key={r.title}
              className="flex gap-4 rounded-2xl border bg-card p-5 shadow-card"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-mono text-xs text-muted-foreground">
                  {r.type} · {r.topic}
                </p>
                <h2 className="mt-1 font-semibold">{r.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{r.summary}</p>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
}
