import { createFileRoute } from "@tanstack/react-router";
import { listPaths } from "@/lib/content.functions";
import { PageHeader } from "@/components/site-chrome";
import { getContentImageUrl } from "@/lib/content-media";

export const Route = createFileRoute("/learning-paths")({
  head: () => ({
    meta: [
      { title: "Learning Paths — Sanidhya School of Coding" },
      {
        name: "description",
        content:
          "Step-by-step roadmaps to become a web developer, AI engineer or security-minded developer.",
      },
      { property: "og:title", content: "Learning Paths — Sanidhya School of Coding" },
      {
        property: "og:description",
        content: "Step-by-step roadmaps combining courses and projects.",
      },
    ],
  }),
  loader: () => listPaths(),
  component: Paths,
});

function Paths() {
  const learningPaths = Route.useLoaderData();
  return (
    <>
      <PageHeader
        eyebrow="Learning paths"
        title="A clear road from start to skilled"
        intro="Each path strings courses and projects together in the right order."
      />
      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-12 lg:grid-cols-3">
        {learningPaths.map((p) => (
          <article key={p.slug} className="overflow-hidden rounded-2xl border bg-card shadow-card">
            <div className="aspect-[16/9] overflow-hidden bg-gradient-soft">
              {getContentImageUrl(p.cover_image_path) ? (
                <img
                  src={getContentImageUrl(p.cover_image_path) ?? ""}
                  alt={`${p.title} learning path cover`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full items-center justify-center font-mono text-sm text-primary">
                  LEARNING PATH
                </div>
              )}
            </div>
            <div className="p-6">
              <p className="font-mono text-xs text-primary">{p.duration}</p>
              <h2 className="mt-2 text-xl font-bold">{p.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{p.summary}</p>
              <ol className="mt-6 space-y-0">
                {p.steps.map((s, i) => (
                  <li key={s} className="relative flex gap-3 pb-5 last:pb-0">
                    {i < p.steps.length - 1 && (
                      <span className="absolute left-[13px] top-7 h-full w-px bg-border" />
                    )}
                    <span className="z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-brand font-mono text-xs text-primary-foreground">
                      {i + 1}
                    </span>
                    <span className="pt-1 text-sm font-medium">{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
