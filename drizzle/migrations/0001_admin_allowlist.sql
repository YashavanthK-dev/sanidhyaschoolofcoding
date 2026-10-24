CREATE TABLE public.admin_allowlist (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  added_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_allowlist ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.admin_allowlist FROM anon, authenticated;
GRANT ALL ON TABLE public.admin_allowlist TO service_role;

DROP TRIGGER IF EXISTS on_auth_user_created_admin ON auth.users;
DROP FUNCTION IF EXISTS public.grant_first_admin();

CREATE OR REPLACE FUNCTION public.is_admin_allowlisted(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT
    _user_id = (SELECT auth.uid())
    AND EXISTS (
      SELECT 1
      FROM public.user_roles AS user_role
      INNER JOIN public.admin_allowlist AS allowed_admin
        ON allowed_admin.user_id = user_role.user_id
      WHERE user_role.user_id = _user_id
        AND user_role.role = 'admin'::public.app_role
    );
$$;

REVOKE ALL ON FUNCTION public.is_admin_allowlisted(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_admin_allowlisted(uuid) TO authenticated, service_role;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT _role = 'admin'::public.app_role AND public.is_admin_allowlisted(_user_id);
$$;

REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;
