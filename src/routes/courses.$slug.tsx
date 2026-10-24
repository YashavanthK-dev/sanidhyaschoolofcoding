import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CheckCircle2, Clock, BookOpen } from "lucide-react";
import { getCourse } from "@/lib/content.functions";
import type { Module } from "@/content/catalog";
import { LevelBadge } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/courses/$slug")({
  loader: async ({ params }) => {
    const course = await getCourse({ data: { slug: params.slug } });
    if (!course) throw notFound();
    return course;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Sanidhya School of Coding` },
          { name: "description", content: loaderData.summary },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.summary },
        ]
      : [{ title: "Course not found" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <h1 className="text-3xl font-bold">Course not found</h1>
      <Link to="/courses" className="mt-4 inline-block text-primary">
        Browse all courses
      </Link>
    </div>
  ),
  component: CoursePage,
});

function CoursePage() {
  const c = Route.useLoaderData();
  return (
    <>
      <section className="border-b bg-gradient-soft">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <Link to="/courses" className="text-sm text-muted-foreground">
            ← Courses
          </Link>
          <div className="mt-4 flex items-center gap-3">
            <span className="font-mono text-xs text-primary">{c.category}</span>
            <LevelBadge level={c.level} />
          </div>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold md:text-5xl">{c.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{c.summary}</p>
          <div className="mt-6 flex gap-5 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {c.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4" />
              {c.lessons} lessons
            </span>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold">Curriculum</h2>
          <ol className="mt-6 space-y-4">
            {(c.modules as Module[]).map((m, i) => (
              <li key={m.title} className="rounded-2xl border bg-card p-5 shadow-card">
                <p className="font-mono text-xs text-primary">
                  Module {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1 font-semibold">{m.title}</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  {m.lessons.map((l) => (
                    <li key={l}>— {l}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
        <aside className="h-fit rounded-2xl border bg-card p-6 shadow-card lg:sticky lg:top-24">
          <h3 className="font-semibold">What you'll be able to do</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {c.outcomes.map((o) => (
              <li key={o} className="flex gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                {o}
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {c.tags.map((t) => (
              <span key={t} className="rounded-md bg-muted px-2 py-0.5 font-mono text-xs">
                {t}
              </span>
            ))}
          </div>
          <Button asChild variant="hero" className="mt-6 w-full">
            <Link to="/contact">Ask about this course</Link>
          </Button>
        </aside>
      </section>
    </>
  );
}
