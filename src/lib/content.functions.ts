import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`)
          h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const listCourses = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient()
    .from("courses")
    .select("*")
    .eq("status", "published")
    .order("sort_order");
  if (error) console.error(error);
  return data ?? [];
});

export const getCourse = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => z.object({ slug: z.string().max(200) }).parse(d))
  .handler(async ({ data }) => {
    const { data: row } = await publicClient()
      .from("courses")
      .select("*")
      .eq("slug", data.slug)
      .eq("status", "published")
      .maybeSingle();
    return row;
  });

export const listProjects = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await publicClient()
    .from("projects")
    .select("*")
    .eq("status", "published")
    .order("sort_order");
  return data ?? [];
});

export const listPaths = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await publicClient()
    .from("learning_paths")
    .select("*")
    .eq("status", "published")
    .order("sort_order");
  return data ?? [];
});

export const listResources = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await publicClient()
    .from("resources")
    .select("*")
    .eq("status", "published")
    .order("sort_order");
  return data ?? [];
});

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  message: z.string().trim().min(1, "Please write a message").max(2000),
});

export const sendMessage = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => contactSchema.parse(d))
  .handler(async ({ data }) => {
    const { error } = await publicClient().from("contact_messages").insert(data);
    if (error) {
      console.error(error);
      return { ok: false };
    }
    return { ok: true };
  });
