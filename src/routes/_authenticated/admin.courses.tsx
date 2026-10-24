import { createFileRoute } from "@tanstack/react-router";
import { ContentManager } from "@/components/admin/content-manager";
import { categories, levels } from "@/content/catalog";

export const Route = createFileRoute("/_authenticated/admin/courses")({
  component: () => (
    <ContentManager
      table="courses"
      title="Courses"
      fields={[
        { name: "title", label: "Title", kind: "text", required: true },
        { name: "summary", label: "Short description", kind: "textarea" },
        { name: "category", label: "Topic", kind: "select", options: categories },
        { name: "level", label: "Level", kind: "select", options: levels },
        { name: "duration", label: "Duration", kind: "text", hint: "e.g. 6 weeks" },
        { name: "lessons", label: "Number of lessons", kind: "number" },
        { name: "outcomes", label: "What students will be able to do", kind: "list" },
        { name: "modules", label: "Curriculum", kind: "modules" },
        { name: "tags", label: "Tags", kind: "list", hint: "Separate with commas or new lines" },
      ]}
    />
  ),
});
