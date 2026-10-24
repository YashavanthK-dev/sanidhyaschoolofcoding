import { createFileRoute } from "@tanstack/react-router";
import { ContentManager } from "@/components/admin/content-manager";
import { levels } from "@/content/catalog";

export const Route = createFileRoute("/_authenticated/admin/projects")({
  component: () => (
    <ContentManager
      table="projects"
      title="Projects"
      fields={[
        { name: "title", label: "Title", kind: "text", required: true },
        { name: "summary", label: "Short description", kind: "textarea" },
        { name: "level", label: "Level", kind: "select", options: levels },
        {
          name: "stack",
          label: "Technologies used",
          kind: "list",
          hint: "Separate with commas or new lines",
        },
      ]}
    />
  ),
});
