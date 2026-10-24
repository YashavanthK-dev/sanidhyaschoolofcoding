import { createFileRoute } from "@tanstack/react-router";
import { listProjects } from "@/lib/content.functions";
import { LevelBadge, PageHeader } from "@/components/site-chrome";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Sanidhya School of Coding" },
      {
        name: "description",
        content: "Real-world projects to build your skills and your portfolio.",
      },
      { property: "og:title", content: "Projects — Sanidhya School of Coding" },
      {
        property: "og:description",
        content: "Real-world projects to build your skills and your portfolio.",
      },
    ],
  }),
  loader: () => listProjects(),
  component: Projects,
});

function Projects() {
  const projects = Route.useLoaderData();
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Build things that work"
        intro="Practical projects you can finish, understand and proudly show."
      />
      <section className="mx-auto grid max-w-6xl gap-5 px-5 py-12 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <article key={p.slug} className="rounded-2xl border bg-card p-6 shadow-card">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-muted-foreground">~/{p.slug}</span>
              <LevelBadge level={p.level} />
            </div>
            <h2 className="mt-4 text-lg font-semibold">{p.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{p.summary}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span key={s} className="rounded-md bg-muted px-2 py-0.5 font-mono text-xs">
                  {s}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
