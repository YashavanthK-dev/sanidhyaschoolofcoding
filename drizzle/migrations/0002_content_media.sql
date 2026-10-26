ALTER TABLE public.courses
  ADD COLUMN IF NOT EXISTS cover_image_path text;
ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS cover_image_path text;
ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS details text NOT NULL DEFAULT '';
ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS features text[] NOT NULL DEFAULT '{}';
ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS repository_url text;
ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS demo_url text;
ALTER TABLE public.learning_paths
  ADD COLUMN IF NOT EXISTS cover_image_path text;
ALTER TABLE public.resources
  ADD COLUMN IF NOT EXISTS cover_image_path text;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'content-media',
  'content-media',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS "Public can view content media" ON storage.objects;
CREATE POLICY "Public can view content media"
  ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'content-media');

DROP POLICY IF EXISTS "Admins upload content media" ON storage.objects;
CREATE POLICY "Admins upload content media"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'content-media'
    AND (storage.foldername(name))[1] IN ('courses', 'projects', 'learning_paths', 'resources')
    AND lower(name) ~ '\.(jpe?g|png|webp)$'
    AND public.has_role((SELECT auth.uid()), 'admin'::public.app_role)
  );

DROP POLICY IF EXISTS "Admins update content media" ON storage.objects;
CREATE POLICY "Admins update content media"
  ON storage.objects FOR UPDATE TO authenticated
  USING (
    bucket_id = 'content-media'
    AND (storage.foldername(name))[1] IN ('courses', 'projects', 'learning_paths', 'resources')
    AND lower(name) ~ '\.(jpe?g|png|webp)$'
    AND public.has_role((SELECT auth.uid()), 'admin'::public.app_role)
  )
  WITH CHECK (
    bucket_id = 'content-media'
    AND (storage.foldername(name))[1] IN ('courses', 'projects', 'learning_paths', 'resources')
    AND lower(name) ~ '\.(jpe?g|png|webp)$'
    AND public.has_role((SELECT auth.uid()), 'admin'::public.app_role)
  );

DROP POLICY IF EXISTS "Admins delete content media" ON storage.objects;
CREATE POLICY "Admins delete content media"
  ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'content-media'
    AND (storage.foldername(name))[1] IN ('courses', 'projects', 'learning_paths', 'resources')
    AND public.has_role((SELECT auth.uid()), 'admin'::public.app_role)
  );
