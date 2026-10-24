import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { categories } from "@/content/catalog";
import { listCourses } from "@/lib/content.functions";
import { CourseCard } from "@/components/cards";
import { PageHeader } from "@/components/site-chrome";

export const Route = createFileRoute("/courses/")({
  validateSearch: z.object({ category: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Courses — Sanidhya School of Coding" },
      {
        name: "description",
        content: "Hands-on courses in Python, JavaScript, SQL, AI, cybersecurity and cloud.",
      },
      { property: "og:title", content: "Courses — Sanidhya School of Coding" },
      {
        property: "og:description",
        content: "Hands-on courses in Python, JavaScript, SQL, AI, cybersecurity and cloud.",
      },
    ],
  }),
  loader: () => listCourses(),
  component: CoursesPage,
});

function CoursesPage() {
  const { category } = Route.useSearch();
  const courses = Route.useLoaderData();
  const list = category ? courses.filter((c) => c.category === category) : courses;
  const chip = "rounded-full border px-4 py-1.5 text-sm font-medium";
  return (
    <>
      <PageHeader
        eyebrow="Courses"
        title="Learn by doing"
        intro="Structured courses that take you from first line of code to shipped software."
      />
      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-wrap gap-2">
          <Link
            to="/courses"
            search={{}}
            className={`${chip} ${!category ? "border-primary bg-accent text-accent-foreground" : "bg-card"}`}
          >
            All
          </Link>
          {categories.map((c) => (
            <Link
              key={c}
              to="/courses"
              search={{ category: c }}
              className={`${chip} ${category === c ? "border-primary bg-accent text-accent-foreground" : "bg-card"}`}
            >
              {c}
            </Link>
          ))}
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </div>
        {list.length === 0 && (
          <p className="mt-8 text-muted-foreground">No courses in this topic yet.</p>
        )}
      </section>
    </>
  );
}
