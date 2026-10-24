import { createFileRoute } from "@tanstack/react-router";
import { ContentManager } from "@/components/admin/content-manager";

export const Route = createFileRoute("/_authenticated/admin/learning-paths")({
  component: () => (
    <ContentManager
      table="learning_paths"
      title="Learning paths"
      fields={[
        { name: "title", label: "Title", kind: "text", required: true },
        { name: "summary", label: "Short description", kind: "textarea" },
        { name: "duration", label: "Duration", kind: "text", hint: "e.g. 6 months" },
        { name: "steps", label: "Steps, in order", kind: "list", hint: "One step per line" },
      ]}
    />
  ),
});
