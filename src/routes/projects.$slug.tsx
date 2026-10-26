import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, CheckCircle2, ExternalLink, Github } from "lucide-react";
import { getProject } from "@/lib/content.functions";
import { getContentImageUrl } from "@/lib/content-media";
import { LevelBadge } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/projects/$slug")({
  loader: async ({ params }) => {
    const project = await getProject({ data: { slug: params.slug } });
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Projects — Sanidhya School of Coding` },
          { name: "description", content: loaderData.summary },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.summary },
        ]
      : [{ title: "Project not found" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <h1 className="text-3xl font-bold">Project not found</h1>
      <Link to="/projects" className="mt-4 inline-block text-primary">
        Browse all projects
      </Link>
    </div>
  ),
  component: ProjectPage,
});

function safeExternalUrl(value: string | null) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}

function ProjectPage() {
  const project = Route.useLoaderData();
  const coverUrl = getContentImageUrl(project.cover_image_path);
  const repositoryUrl = safeExternalUrl(project.repository_url);
  const demoUrl = safeExternalUrl(project.demo_url);

  return (
    <>
      <section className="border-b bg-gradient-soft">
        <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> All projects
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs text-primary">PROJECT / {project.slug}</span>
            <LevelBadge level={project.level} />
          </div>
          <h1 className="mt-3 max-w-4xl text-4xl font-bold md:text-5xl">{project.title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
            {project.summary}
          </p>
          {(repositoryUrl || demoUrl) && (
            <div className="mt-7 flex flex-wrap gap-3">
              {repositoryUrl && (
                <Button asChild variant="outline">
                  <a href={repositoryUrl} target="_blank" rel="noopener noreferrer">
                    <Github /> View source <ExternalLink />
                  </a>
                </Button>
              )}
              {demoUrl && (
                <Button asChild variant="hero">
                  <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                    Open live demo <ArrowUpRight />
                  </a>
                </Button>
              )}
            </div>
          )}
          {coverUrl && (
            <div className="mt-9 overflow-hidden rounded-3xl border bg-card shadow-card">
              <img
                src={coverUrl}
                alt={`${project.title} project cover`}
                className="max-h-[34rem] w-full object-cover"
              />
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 lg:grid-cols-[1fr_19rem]">
        <article>
          <h2 className="text-2xl font-bold">About this project</h2>
          <p className="mt-4 whitespace-pre-wrap leading-8 text-muted-foreground">
            {project.details || project.summary}
          </p>
          {project.features.length > 0 && (
            <div className="mt-10">
              <h2 className="text-2xl font-bold">What you’ll build</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li key={feature} className="flex gap-3 rounded-xl border bg-card p-4 text-sm">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>
        <aside className="h-fit rounded-2xl border bg-card p-6 shadow-card lg:sticky lg:top-24">
          <h2 className="font-semibold">Technology used</h2>
          {project.stack.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((technology) => (
                <span
                  key={technology}
                  className="rounded-md bg-muted px-2.5 py-1 font-mono text-xs"
                >
                  {technology}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">Details coming soon.</p>
          )}
          <Button asChild variant="outline" className="mt-6 w-full">
            <Link to="/contact">Ask about this project</Link>
          </Button>
        </aside>
      </section>
    </>
  );
}
