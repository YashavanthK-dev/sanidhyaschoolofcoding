import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { listProjects } from "@/lib/content.functions";
import { LevelBadge, PageHeader } from "@/components/site-chrome";
import { getContentImageUrl } from "@/lib/content-media";

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
          <Link
            key={p.slug}
            to="/projects/$slug"
            params={{ slug: p.slug }}
            className="group overflow-hidden rounded-2xl border bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant"
          >
            <div className="aspect-[16/9] overflow-hidden bg-ink">
              {getContentImageUrl(p.cover_image_path) ? (
                <img
                  src={getContentImageUrl(p.cover_image_path) ?? ""}
                  alt={`${p.title} project cover`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full items-center justify-center font-mono text-sm text-primary">
                  PROJECT / {p.level.toUpperCase()}
                </div>
              )}
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-muted-foreground">~/{p.slug}</span>
                <LevelBadge level={p.level} />
              </div>
              <h2 className="mt-4 text-lg font-semibold group-hover:text-primary">{p.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{p.summary}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span key={s} className="rounded-md bg-muted px-2 py-0.5 font-mono text-xs">
                    {s}
                  </span>
                ))}
              </div>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                View project{" "}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
