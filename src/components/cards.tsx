import { Link } from "@tanstack/react-router";
import { Clock, BookOpen } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";
import { LevelBadge } from "@/components/site-chrome";
import { getContentImageUrl } from "@/lib/content-media";

export function CourseCard({ course }: { course: Tables<"courses"> }) {
  const coverUrl = getContentImageUrl(course.cover_image_path);
  return (
    <Link
      to="/courses/$slug"
      params={{ slug: course.slug }}
      className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-gradient-soft">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={`${course.title} course cover`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-ink text-ink-foreground">
            <span className="font-mono text-sm text-primary">{course.category} / COURSE</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-muted-foreground">{course.category}</span>
          <LevelBadge level={course.level} />
        </div>
        <h3 className="mt-4 text-xl font-semibold group-hover:text-primary">{course.title}</h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground">{course.summary}</p>
        <div className="mt-5 flex gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5" />
            {course.lessons} lessons
          </span>
        </div>
      </div>
    </Link>
  );
}
