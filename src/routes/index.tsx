import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Code2, Hammer, Layers, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories } from "@/content/catalog";
import { listCourses, listPaths, listProjects } from "@/lib/content.functions";
import { CourseCard } from "@/components/cards";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sanidhya School of Coding — Learn. Build. Create." },
      {
        name: "description",
        content:
          "A modern technology academy: practical courses, real projects and clear learning paths in code, AI, security and cloud.",
      },
      { property: "og:title", content: "Sanidhya School of Coding — Learn. Build. Create." },
      {
        property: "og:description",
        content:
          "Practical courses, real projects and clear learning paths in code, AI, security and cloud.",
      },
    ],
  }),
  loader: async () => {
    const [courses, projects, paths] = await Promise.all([
      listCourses(),
      listProjects(),
      listPaths(),
    ]);
    return { courses, projects, paths };
  },
  component: Index,
});

const pillars = [
  {
    icon: Hammer,
    title: "Build, not just study",
    text: "Every topic ends in something you made and can show.",
  },
  {
    icon: Code2,
    title: "Practice, not just theory",
    text: "Short explanations, then straight into the editor.",
  },
  {
    icon: Sparkles,
    title: "Create, not just memorize",
    text: "Understand why things work so you can invent your own.",
  },
];

function Index() {
  const { courses, projects, paths: learningPaths } = Route.useLoaderData();
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-soft">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
        <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-16 md:pb-28 md:pt-24">
          <p className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 font-mono text-xs text-muted-foreground shadow-card">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> &lt;learn /&gt; &lt;build /&gt;
            &lt;create /&gt;
          </p>
          <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.05] md:text-6xl">
            Learn technology by <span className="text-gradient-brand">building it.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Sanidhya is a hands-on academy for programming, web development, AI, cybersecurity and
            cloud — taught through real projects, not just slides.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="lg">
              <Link to="/courses">
                Explore courses <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/learning-paths">Find your path</Link>
            </Button>
          </div>
          <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6">
            {[
              [courses.length, "Courses"],
              [projects.length, "Projects"],
              [learningPaths.length, "Learning paths"],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="font-display text-3xl font-bold">{n}</dt>
                <dd className="text-sm text-muted-foreground">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid gap-5 md:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title} className="rounded-2xl border bg-card p-6 shadow-card">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground">
                <p.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-primary">
              Featured courses
            </p>
            <h2 className="mt-2 text-3xl font-bold">Start where you are</h2>
          </div>
          <Link to="/courses" className="hidden text-sm font-semibold text-primary sm:block">
            All courses →
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.slice(0, 3).map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">Topics</p>
        <h2 className="mt-2 text-3xl font-bold">What you can learn</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link
              key={c}
              to="/courses"
              search={{ category: c }}
              className="rounded-full border bg-card px-4 py-2 text-sm font-medium hover:border-primary hover:text-primary"
            >
              {c}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5">
        <div className="relative overflow-hidden rounded-3xl bg-ink p-8 text-ink-foreground md:p-14">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-brand opacity-40 blur-3xl" />
          <Layers className="relative h-8 w-8 text-primary" />
          <h2 className="relative mt-4 max-w-xl text-3xl font-bold md:text-4xl">
            Not sure where to begin? Follow a learning path.
          </h2>
          <p className="relative mt-3 max-w-lg opacity-80">
            Step-by-step roadmaps that combine courses and projects into one clear journey.
          </p>
          <Button asChild variant="hero" size="lg" className="relative mt-8">
            <Link to="/learning-paths">
              See learning paths <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
