import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpenCheck, Code2, Compass, Github, Linkedin, Youtube } from "lucide-react";
import { PageHeader } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Sanidhya — Learn. Build. Create." },
      {
        name: "description",
        content:
          "Meet Sanidhya School of Coding: a practical technology learning platform focused on understanding concepts, building projects and exploring beyond the syllabus.",
      },
      { property: "og:title", content: "About Sanidhya School of Coding" },
      {
        property: "og:description",
        content:
          "A practical technology learning platform for students, developers and curious builders.",
      },
    ],
  }),
  component: About,
});

function About() {
  const philosophy = [
    {
      number: "01",
      title: "Understand",
      text: "Go beyond definitions. Learn why a technology exists and how its core ideas work.",
      icon: BookOpenCheck,
    },
    {
      number: "02",
      title: "Practice",
      text: "Turn concepts into code with focused exercises, experiments and hands-on work.",
      icon: Code2,
    },
    {
      number: "03",
      title: "Build",
      text: "Bring skills together to create useful applications, tools and real projects.",
      icon: ArrowRight,
    },
    {
      number: "04",
      title: "Explore",
      text: "Keep learning beyond the syllabus and discover modern tools and practices.",
      icon: Compass,
    },
  ];

  const values = [
    ["Depth", "Understand the ideas beneath the surface."],
    ["Practicality", "Connect each foundation to real implementation."],
    ["Curiosity", "Keep asking how technology works and why."],
    ["Creation", "Turn knowledge into software people can use."],
  ];

  const socials = [
    { label: "GitHub", href: "https://github.com/YashavanthK-dev/Yashavanth-K", icon: Github },
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

  return (
    <>
      <PageHeader
        eyebrow="About Sanidhya"
        title="Learning technology beyond the syllabus."
        intro="Technology education should help you understand how things work, practice what you learn and build something real. That idea shapes everything at Sanidhya School of Coding."
      />

      <section className="mx-auto max-w-6xl px-5 py-14 md:py-20">
        <div className="grid overflow-hidden rounded-3xl border bg-card shadow-card md:grid-cols-[0.8fr_1.2fr]">
          <div className="flex items-center bg-ink p-8 text-ink-foreground md:p-10">
            <h2 className="font-display text-4xl font-extrabold leading-tight md:text-5xl">
              Learn.
              <br />
              Build.
              <br />
              <span className="text-primary">Create.</span>
            </h2>
          </div>
          <div className="space-y-5 p-7 leading-7 text-muted-foreground md:p-10">
            <p>
              Sanidhya School of Coding is a technology learning platform for students, developers
              and technology enthusiasts who want to go further than theory alone.
            </p>
            <p>
              We explore programming, web development, databases, artificial intelligence,
              cybersecurity and cloud through clear explanations and practical implementation.
            </p>
            <p>
              Rather than stopping at definitions and tutorials, we ask why technologies exist, how
              they work and how developers combine them to create real systems.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y bg-secondary/35 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-widest text-primary">
              Our learning philosophy
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              Learning should lead to building.
            </h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              A useful learning journey connects understanding with practice, then gives you room to
              make something of your own.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {philosophy.map(({ number, title, text, icon: Icon }) => (
              <article key={number} className="rounded-2xl border bg-card p-6 shadow-card">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-primary">{number}</span>
                  <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">The approach</p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">From learning to making.</h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            Strong foundations matter. So does putting them to work. Sanidhya helps learners move
            from the first idea to a finished project, one deliberate step at a time.
          </p>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <article className="rounded-2xl border bg-card p-6 md:p-8">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Start with the foundations
            </p>
            <h3 className="mt-2 text-xl font-semibold">Learn the concepts clearly.</h3>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-muted-foreground">
              <li>Build a solid understanding of core ideas.</li>
              <li>Get comfortable with the language and tools.</li>
              <li>Practice problem-solving as you learn.</li>
              <li>Ask questions about how systems fit together.</li>
            </ul>
          </article>
          <article className="rounded-2xl border border-primary/30 bg-primary/5 p-6 md:p-8">
            <p className="font-mono text-xs uppercase tracking-widest text-primary">
              Keep going with Sanidhya
            </p>
            <h3 className="mt-2 text-xl font-semibold">Apply what you know.</h3>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-muted-foreground">
              <li>Work through structured, hands-on exercises.</li>
              <li>Experiment with real development tools and workflows.</li>
              <li>Build practical applications and developer projects.</li>
              <li>Connect separate concepts into complete systems.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="border-y bg-gradient-soft py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="rounded-3xl border bg-card p-8 text-center shadow-card">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-brand font-display text-3xl font-bold text-primary-foreground">
              YK
            </div>
            <p className="mt-5 font-mono text-xs uppercase tracking-widest text-primary">
              The person behind Sanidhya
            </p>
            <h2 className="mt-2 text-2xl font-bold">Yashavanth K</h2>
            <p className="mt-1 text-sm text-muted-foreground">Founder &amp; Creator</p>
            <div className="mt-5 flex justify-center gap-3">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={`${label} profile`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-primary">The vision</p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              Make technology learning practical, deep and open-ended.
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Sanidhya was created to make learning feel connected to the way technology is built
              and used. The goal is to help learners become curious about computing, gain confidence
              through practice and turn their ideas into working software.
            </p>
            <blockquote className="mt-6 border-l-2 border-primary pl-5 font-display text-xl font-semibold leading-relaxed text-foreground">
              “Technology becomes meaningful when you understand it deeply enough to build with it.”
            </blockquote>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">
          What we stand for
        </p>
        <h2 className="mt-2 text-3xl font-bold md:text-4xl">Values that guide the work.</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(([title, text]) => (
            <article key={title} className="rounded-2xl border bg-card p-5 shadow-card">
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="rounded-3xl border bg-gradient-soft p-8 md:p-12">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">
            Start exploring
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold md:text-4xl">
            Choose a topic and make your next idea real.
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
            Explore practical courses, follow a learning path and build something you can share.
          </p>
          <Button asChild variant="hero" size="lg" className="mt-7">
            <Link to="/courses">
              Explore courses <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
