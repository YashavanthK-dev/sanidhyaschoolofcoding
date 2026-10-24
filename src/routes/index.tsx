import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  ExternalLink,
  Github,
  Globe,
  Hammer,
  Layers,
  Linkedin,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/cards";
import { categories } from "@/content/catalog";
import { listCourses, listPaths, listProjects, listResources } from "@/lib/content.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sanidhya School of Coding — Learn. Build. Create." },
      {
        name: "description",
        content:
          "Explore practical coding courses, guided learning paths, real projects, technical resources and video lessons from Sanidhya School of Coding.",
      },
      { property: "og:title", content: "Sanidhya School of Coding — Learn. Build. Create." },
      {
        property: "og:description",
        content:
          "A practical learning hub for programming, web development, databases, AI, cybersecurity and cloud.",
      },
    ],
  }),
  loader: async () => {
    const [courses, projects, paths, resources] = await Promise.all([
      listCourses(),
      listProjects(),
      listPaths(),
      listResources(),
    ]);
    return { courses, projects, paths, resources };
  },
  component: Index,
});

const pillars = [
  {
    icon: Hammer,
    title: "Build, not just study",
    text: "Turn each new idea into something useful you can explain and share.",
  },
  {
    icon: Code2,
    title: "Practice, not just theory",
    text: "Move from clear explanations to guided exercises and working code.",
  },
  {
    icon: Sparkles,
    title: "Create, not just memorize",
    text: "Understand the concepts well enough to shape your own solutions.",
  },
];

const categoryIcons: Record<string, typeof Code2> = {
  Programming: Code2,
  "Web Development": Globe,
  Databases: Database,
  "Artificial Intelligence": BrainCircuit,
  Cybersecurity: ShieldCheck,
  "Cloud & DevOps": Cloud,
};

const categoryDescriptions: Record<string, string> = {
  Programming: "Learn the building blocks and write programs that solve real problems.",
  "Web Development": "Shape responsive interfaces and connect them to useful services.",
  Databases: "Model information, query it clearly and build reliable data flows.",
  "Artificial Intelligence": "Explore AI concepts and put them to work in practical apps.",
  Cybersecurity: "Understand common risks and develop safer software habits.",
  "Cloud & DevOps": "Deploy applications and learn the systems that keep them running.",
};

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/YashavanthK-dev/Yashavanth-K",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sanidhyaschoolofcoding/",
    icon: Linkedin,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@SanidhyaSchoolOfCoding",
    icon: Youtube,
  },
];

function Index() {
  const { courses, projects, paths: learningPaths, resources } = Route.useLoaderData();
  return (
    <>
      <section className="relative isolate overflow-hidden bg-gradient-soft">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-60" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-[1.05fr_0.95fr] md:py-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 font-mono text-xs text-muted-foreground shadow-card">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              LEARN <span className="text-primary">·</span> BUILD{" "}
              <span className="text-primary">·</span> CREATE
            </p>
            <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
              Learn technology by <span className="text-gradient-brand">building it.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Go from your first lines of code to complete applications with practical courses,
              step-by-step roadmaps and projects you can make your own.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="lg">
                <Link to="/courses">
                  Explore courses <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/projects">See what you can build</Link>
              </Button>
            </div>
            <dl className="mt-10 grid max-w-xl grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4">
              {[
                [courses.length, "Courses"],
                [projects.length, "Projects"],
                [learningPaths.length, "Learning paths"],
                [resources.length, "Resources"],
              ].map(([count, label]) => (
                <div key={label} className="border-l-2 border-primary/30 pl-3">
                  <dt className="font-display text-2xl font-bold">{count}</dt>
                  <dd className="text-xs text-muted-foreground">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-8 -z-10 rounded-full bg-primary/10 blur-3xl" />
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-ink text-ink-foreground shadow-elegant">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div className="flex items-center gap-2 font-mono text-xs text-white/65">
                  <TerminalSquare className="h-4 w-4 text-primary" /> YOUR LEARNING PIPELINE
                </div>
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2 w-2 rounded-full bg-white/25" />
                  <span className="h-2 w-2 rounded-full bg-white/25" />
                  <span className="h-2 w-2 rounded-full bg-primary" />
                </div>
              </div>
              <div className="space-y-5 p-6 md:p-8">
                <p className="font-mono text-xs text-white/45">
                  // A clear route from curiosity to capability
                </p>
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 font-mono text-sm leading-7">
                  <p>
                    <span className="text-primary">01</span>{" "}
                    <span className="text-white/55">learn</span>(the_concept)
                  </p>
                  <p>
                    <span className="text-primary">02</span>{" "}
                    <span className="text-white/55">practice</span>(with_guidance)
                  </p>
                  <p>
                    <span className="text-primary">03</span>{" "}
                    <span className="text-white/55">build</span>(a_real_project)
                  </p>
                  <p>
                    <span className="text-primary">04</span>{" "}
                    <span className="text-white/55">share</span>(what_you_made)
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    ["01", "Understand", "Start with the why"],
                    ["02", "Practice", "Try it with support"],
                    ["03", "Create", "Ship something real"],
                  ].map(([number, title, detail]) => (
                    <div key={number} className="rounded-xl border border-white/10 p-3">
                      <p className="font-mono text-[10px] text-primary">STEP {number}</p>
                      <p className="mt-2 text-sm font-semibold">{title}</p>
                      <p className="mt-1 text-xs text-white/55">{detail}</p>
                    </div>
                  ))}
                </div>
                <p className="flex items-center gap-2 text-xs text-white/55">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />A practical learning
                  loop, at your own pace
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 md:py-20" aria-label="How we teach">
        <div className="grid gap-4 md:grid-cols-3">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="rounded-2xl border bg-card p-6 shadow-card">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground">
                <pillar.icon className="h-5 w-5" />
              </div>
              <h2 className="mt-5 text-lg font-semibold">{pillar.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{pillar.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="topics" className="scroll-mt-24 border-y bg-secondary/35 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-widest text-primary">
              Explore technology
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              Choose a topic. Find your next step.
            </h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              Browse the foundations and modern tools behind the software we use every day.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const CategoryIcon = categoryIcons[category] ?? Code2;
              return (
                <Link
                  key={category}
                  to="/courses"
                  search={{ category }}
                  className="group rounded-2xl border bg-card p-5 shadow-card transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-elegant"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                      <CategoryIcon className="h-5 w-5" />
                    </span>
                    <ArrowRight className="mt-1 h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </div>
                  <h3 className="mt-5 font-semibold">{category}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {categoryDescriptions[category]}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-primary">
              Start where you are
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Learn by doing</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Structured courses take you from core concepts to software you can run and improve.
            </p>
          </div>
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            Browse all courses <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {courses.length ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {courses.slice(0, 3).map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed p-8 text-sm text-muted-foreground">
            New courses are on the way. Explore the topic areas above or browse the learning
            resources.
          </div>
        )}
      </section>

      <section id="paths" className="border-y bg-gradient-soft py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-primary">
                Learning paths
              </p>
              <h2 className="mt-2 text-3xl font-bold md:text-4xl">A roadmap, not a guess</h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                Follow a sequence of skills and projects, with a clear next step at every stage.
              </p>
            </div>
            <Link
              to="/learning-paths"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              See every roadmap <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          {learningPaths.length ? (
            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {learningPaths.slice(0, 3).map((path) => (
                <article key={path.slug} className="rounded-2xl border bg-card p-6 shadow-card">
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 font-mono text-xs text-primary">
                      <Layers className="h-4 w-4" /> {path.duration}
                    </span>
                    <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                      {path.steps.length} steps
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">{path.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{path.summary}</p>
                  <ol className="mt-5 space-y-3 border-l border-primary/25 pl-4">
                    {path.steps.slice(0, 3).map((step, index) => (
                      <li key={step} className="relative text-sm text-muted-foreground">
                        <span className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-primary" />
                        <span className="mr-2 font-mono text-[10px] text-primary">
                          0{index + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed bg-card/70 p-8 text-sm text-muted-foreground">
              Guided paths are being prepared. Start with a course and build your first project as
              you go.
            </div>
          )}
        </div>
      </section>

      <section id="projects" className="scroll-mt-24 mx-auto max-w-6xl px-5 py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-primary">
              Build & showcase
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Put your skills to work</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Small, purposeful builds help you connect concepts and make a portfolio that tells a
              story.
            </p>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            Explore the project lab <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {projects.length ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((project, index) => (
              <article
                key={project.slug}
                className="group overflow-hidden rounded-2xl border bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant"
              >
                <div className="relative flex h-28 items-end justify-between overflow-hidden bg-ink p-5 text-ink-foreground">
                  <div className="absolute -right-7 -top-16 h-40 w-40 rounded-full bg-gradient-brand opacity-40 blur-2xl" />
                  <span className="relative font-mono text-xs text-white/60">
                    BUILD / {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="relative rounded-full border border-white/15 px-2.5 py-1 text-xs">
                    {project.level}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold group-hover:text-primary">
                    {project.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
                    {project.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 4).map((technology) => (
                      <span
                        key={technology}
                        className="rounded-md bg-muted px-2 py-1 font-mono text-[10px] text-muted-foreground"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed p-8 text-sm text-muted-foreground">
            Project briefs are being prepared. Browse the courses to find a practical place to
            start.
          </div>
        )}
      </section>

      <section id="resources" className="scroll-mt-24 border-y bg-secondary/35 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-primary">
                Knowledge hub
              </p>
              <h2 className="mt-2 text-3xl font-bold md:text-4xl">Keep learning between builds</h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                Revisit a concept with concise notes, guides, cheatsheets and video resources.
              </p>
            </div>
            <Link
              to="/resources"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              Browse all resources <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          {resources.length ? (
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {resources.slice(0, 4).map((resource) => (
                <article
                  key={resource.id}
                  className="flex gap-4 rounded-2xl border bg-card p-5 shadow-card"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                    {resource.type.toLowerCase() === "video" ? (
                      <PlayCircle className="h-5 w-5" />
                    ) : (
                      <BookOpen className="h-5 w-5" />
                    )}
                  </span>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-primary">
                      {resource.type}{" "}
                      <span className="text-muted-foreground">· {resource.topic}</span>
                    </p>
                    <h3 className="mt-1 font-semibold">{resource.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {resource.summary}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed bg-card/70 p-8 text-sm text-muted-foreground">
              The resource library is growing. In the meantime, explore a course or follow a
              learning path.
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative overflow-hidden rounded-3xl bg-ink p-8 text-ink-foreground md:p-10">
            <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-gradient-brand opacity-35 blur-3xl" />
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/5">
              <PlayCircle className="h-6 w-6 text-primary" />
            </div>
            <p className="relative mt-6 font-mono text-xs uppercase tracking-widest text-primary">
              Watch · learn · build
            </p>
            <h2 className="relative mt-2 max-w-xl text-3xl font-bold md:text-4xl">
              Good explanations make the next build easier.
            </h2>
            <p className="relative mt-3 max-w-xl leading-7 text-white/70">
              Explore video lessons and practical learning updates from Sanidhya School of Coding.
            </p>
            <Button asChild variant="hero" size="lg" className="relative mt-7">
              <a
                href="https://www.youtube.com/@SanidhyaSchoolOfCoding"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit the YouTube channel <ExternalLink />
              </a>
            </Button>
          </div>
          <div className="rounded-3xl border bg-card p-7 shadow-card md:p-9">
            <p className="font-mono text-xs uppercase tracking-widest text-primary">
              The community
            </p>
            <h2 className="mt-2 text-2xl font-bold">Keep building with us.</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Follow the work, find new ideas and stay connected as the learning hub grows.
            </p>
            <div className="mt-6 space-y-2">
              {socialLinks.map(({ label, href, icon: SocialIcon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium transition-colors hover:border-primary/50 hover:bg-accent/50"
                >
                  <span className="flex items-center gap-3">
                    <SocialIcon className="h-4 w-4 text-primary" /> {label}
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="relative overflow-hidden rounded-3xl border bg-gradient-soft p-8 md:p-12">
          <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <p className="relative font-mono text-xs uppercase tracking-widest text-primary">
            Your next step starts here
          </p>
          <h2 className="relative mt-3 max-w-2xl text-3xl font-bold md:text-4xl">
            Turn curiosity into something you can show.
          </h2>
          <p className="relative mt-3 max-w-2xl leading-7 text-muted-foreground">
            Pick a topic, follow a roadmap and build a project one useful skill at a time.
          </p>
          <div className="relative mt-7 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="lg">
              <Link to="/learning-paths">
                Find your path <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Ask a question</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
