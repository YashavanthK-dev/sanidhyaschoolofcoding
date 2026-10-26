import { supabase } from "@/integrations/supabase/client";

export const CONTENT_MEDIA_BUCKET = "content-media";

export function getContentImageUrl(path: string | null | undefined) {
  if (!path) return null;
  return supabase.storage.from(CONTENT_MEDIA_BUCKET).getPublicUrl(path).data.publicUrl;
}

export function isManagedContentImage(path: string | null | undefined, table: string) {
  if (!path) return false;
  return new RegExp(`^${table}/[0-9a-f-]{36}\\.(?:jpg|png|webp)$`, "i").test(path);
}
