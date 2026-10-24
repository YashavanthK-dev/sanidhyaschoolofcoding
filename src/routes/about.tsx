import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site-chrome";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Sanidhya School of Coding" },
      {
        name: "description",
        content: "Why Sanidhya exists: technology learning that goes beyond classroom theory.",
      },
      { property: "og:title", content: "About Sanidhya School of Coding" },
      {
        property: "og:description",
        content: "Technology learning that goes beyond classroom theory.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Beyond classroom theory"
        intro="Sanidhya is a modern technology lab for students, developers and anyone curious about how software really works."
      />
      <section className="mx-auto max-w-3xl space-y-5 px-5 py-14 text-lg leading-relaxed text-muted-foreground">
        <p>
          Too much technology education stops at definitions and exams. At Sanidhya we believe you
          understand something when you can build it — so every lesson leads to code you write
          yourself.
        </p>
        <p>
          We cover programming fundamentals, web and full-stack engineering, databases, artificial
          intelligence, cybersecurity and cloud — taught practically, in plain language, with real
          projects.
        </p>
        <p className="font-display text-2xl font-semibold text-foreground">
          Build, not just study. Practice, not just theory. Create, not just memorize.
        </p>
      </section>
    </>
  );
}
