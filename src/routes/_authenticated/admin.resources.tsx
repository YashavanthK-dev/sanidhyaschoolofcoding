import { createFileRoute } from "@tanstack/react-router";
import { ContentManager } from "@/components/admin/content-manager";

export const Route = createFileRoute("/_authenticated/admin/resources")({
  component: () => (
    <ContentManager
      table="resources"
      title="Resources"
      hasSlug={false}
      fields={[
        { name: "title", label: "Title", kind: "text", required: true },
        {
          name: "type",
          label: "Type",
          kind: "select",
          options: ["Notes", "Article", "Cheatsheet", "Video"],
        },
        { name: "topic", label: "Topic", kind: "text" },
        { name: "summary", label: "Short description", kind: "textarea" },
        {
          name: "url",
          label: "Link (optional)",
          kind: "text",
          hint: "e.g. a YouTube video or PDF link",
        },
      ]}
    />
  ),
});
