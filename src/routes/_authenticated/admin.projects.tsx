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
        { name: "summary", label: "Short summary", kind: "textarea", required: true },
        {
          name: "details",
          label: "Project details",
          kind: "textarea",
          hint: "Explain what the project does, how it works, and what learners can practice.",
        },
        { name: "cover_image_path", label: "Project cover image", kind: "image" },
        { name: "level", label: "Level", kind: "select", options: levels },
        {
          name: "stack",
          label: "Technologies used",
          kind: "list",
          hint: "Separate with commas or new lines",
        },
        { name: "features", label: "Key features", kind: "list", hint: "One feature per line" },
        {
          name: "repository_url",
          label: "Source code URL",
          kind: "text",
          hint: "https://github.com/…",
        },
        { name: "demo_url", label: "Live demo URL", kind: "text", hint: "https://…" },
      ]}
    />
  ),
});
