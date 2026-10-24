// Content is stored in the database and managed from /admin.
export const categories = [
  "Programming",
  "Web Development",
  "Databases",
  "Artificial Intelligence",
  "Cybersecurity",
  "Cloud & DevOps",
];
export const levels = ["Beginner", "Intermediate", "Advanced"] as const;
export type Module = { title: string; lessons: string[] };
