# Sanidhya School of Coding

Sanidhya School of Coding (SSC) is an e-learning platform prototype for people interested in computer science and coding. It brings courses, learning paths, projects, and study resources together in one place. The platform is a work in progress; over time it will grow with new roadmaps, courses, and projects to help learners build their skills.

> **Project status:** Prototype. Content and features are being developed over time.

## For learners

- Browse published courses with summaries, levels, topics, outcomes, and modules.
- Follow learning paths that suggest an order for studying related topics.
- Explore programming and software projects, including their technology stacks.
- Find notes, articles, cheatsheets, and video links.
- Send questions or feedback through the contact form.

This is an educational resource and project showcase. It does not currently provide course enrollment, learner accounts, progress tracking, quizzes, certificates, or payments.

## Project at a glance

| Area | Details |
| --- | --- |
| Audience | People interested in computer science and coding |
| Stage | E-learning prototype, under active development |
| Live site | [sanidhyaschoolofcodingcom.vercel.app](https://sanidhyaschoolofcodingcom.vercel.app/) |
| Admin | `/admin` (authorized Supabase account required) |
| Data | Supabase Postgres with row-level security |
| Hosting | Vercel |

## Technology

- React 19 and TypeScript for UI and application logic.
- TanStack Start and TanStack Router for file-based routes, server rendering, and server functions.
- Vite for local development and production builds.
- Tailwind CSS 4, Radix UI primitives, and Lucide icons for the interface.
- Supabase for Postgres, authentication, and row-level security (RLS).
- Drizzle ORM and Drizzle Kit for schema and migration tooling.
- Vitest, Testing Library, and ESLint for tests and code quality.
- npm for dependency management; `package-lock.json` is the committed lockfile.

## Website sections

- `/` — Home and featured content.
- `/about` — Platform, learning principles, and founder information.
- `/courses` — Published courses; individual course pages use a slug.
- `/learning-paths` — Suggested sequences of topics and courses.
- `/projects` — Published project examples.
- `/resources` — Published study materials and links.
- `/contact` — Contact form.
- `/auth` — Admin sign-in.
- `/admin` — Content and contact-message management for authorized admins.

Routes are in `src/routes/`. TanStack Router generates `src/routeTree.gen.ts`; do not edit the generated file manually.

## Repository layout

```text
src/
  components/             Shared site UI and admin content manager
  content/                Local content catalog and definitions
  integrations/supabase/  Supabase clients, auth helpers, generated DB types
  lib/                    Server functions and shared utilities
  routes/                 Public, auth, and admin routes
  test/                   Test setup and route tests
drizzle/
  schema.ts               Drizzle database schema
  migrations/             SQL migrations and migration journal
supabase/
  config.toml             Supabase project configuration
public/                   Static assets served as-is
```

## Run locally

### Prerequisites

- Node.js (a supported LTS release) and npm.
- Git.
- Access to the configured Supabase project for database-backed features.

Check versions with `node --version` and `npm --version`.

### Install

```sh
git clone https://github.com/YashavanthK-dev/sanidhyaschoolofcoding.git
cd sanidhyaschoolofcoding
npm ci
```

`npm ci` uses the committed `package-lock.json`. Use `npm install` when intentionally changing dependencies or the lockfile.

### Environment configuration

Create `.env` in the project root (it is ignored by Git). Set the Supabase URL and publishable key from the Supabase project settings:

```dotenv
SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
```

The `VITE_` variables are used by the browser client; the non-prefixed variables are used by server code. Keep each URL and key pair pointed at the same Supabase project. A publishable key is intended for client use, but RLS policies must still correctly protect the data.

Never place a service-role key, database password, or other secret in a `VITE_` variable or commit it. `SUPABASE_SERVICE_ROLE_KEY` is only for trusted server-side code that explicitly uses the service-role client. `LOVABLE_DB_MIGRATION_URL` is only for Drizzle Kit database operations. Neither is a substitute for the publishable key. Project ID variables may also be configured by hosted environments; the application primarily requires the URL and publishable key above.

### Start development

```sh
npm run dev
```

Open the URL Vite prints in the terminal (commonly `http://localhost:5173`). Stop the server with `Ctrl+C`.

## Supabase and database setup

The Drizzle schema is in `drizzle/schema.ts`; SQL migrations are in `drizzle/migrations/`.

1. Create or select the Supabase project and configure the environment variables above.
2. Review and apply the migrations in order: `0000_content_and_admin.sql`, `0001_admin_allowlist.sql`, then `0002_content_media.sql`, using your approved Supabase workflow or SQL editor.
3. The first migration creates content tables, RLS policies, contact messages, and starter content. The second removes first-user auto-admin assignment and requires an allowlisted admin for the database role check. The third adds richer project details, cover-image fields, and a public-read/admin-write image bucket with a 5 MB size limit and image MIME restrictions.
4. After the allowlist migration, a project owner must add each intended Supabase user's UUID to `public.admin_allowlist` and grant that user the `admin` role in `public.user_roles`. Do not expose service-role credentials in the browser. The allowlist table is not accessible to anonymous or authenticated clients.
5. Verify that the admin can sign in and manage content, uploads work for admins, and public pages only show published records.

These migrations change database security and access. Verify the target Supabase project before applying; do not reset a database to install them. For schema changes, update the Drizzle schema and create/review a new migration instead of editing an already-applied migration.

Public content is fetched by server functions using the publishable client and protected by RLS. Admin screens write through the signed-in browser client; the database `has_role(admin)` policy is the authorization boundary. Contact form submissions are allowed anonymously and should be treated as untrusted input.

## Useful commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create the production build |
| `npm run build:dev` | Build in development mode |
| `npm run preview` | Preview a production build locally |
| `npm test` | Run the Vitest suite once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Run ESLint |
| `npm run format` | Format files with Prettier |

After a successful build, `npm run preview` serves the built app locally; it does not deploy the site.

## Content management

Authorized admins can manage courses, learning paths, projects, resources, and contact messages from `/admin`. Content supports draft, published, and archived statuses. Public content queries filter for published items, while RLS is responsible for protecting non-public records.

Admin sign-in is at `/auth`. Access depends on Supabase authentication and database roles/allowlist policies. Removing a registration button from the interface alone does not enforce authorization; configure the database policies and allowlist as described above.

## Checks before release

Run the checks relevant to your changes:

```sh
npm test
npm run lint
npm run build
```

Vitest configuration is in `vitest.config.ts`; tests live beside code or under `src/`. TypeScript settings are in `tsconfig.json`. Resolve failures before shipping and review any build warnings separately.

## Deployment

The production site is hosted on Vercel and this repository is connected to its deployment workflow. To set up a Vercel project:

1. Import `YashavanthK-dev/sanidhyaschoolofcoding` into Vercel.
2. Add the required Supabase environment variables in Project Settings for the desired environments (Production, Preview, and Development).
3. Use `npm ci` to install dependencies and `npm run build` as the build command; keep the TanStack Start/Vercel settings detected by the project's integration.
4. Deploy and verify the deployed pages, admin sign-in, and database-backed features.

Do not commit `.env` or place its contents in build logs. Environment changes may require a new deployment to take effect. A local preview is not a production deployment.

## Contributing

1. Create a focused branch for your change.
2. Install from the lockfile with `npm ci`.
3. Make a focused change and update or add tests where useful.
4. Run the relevant test, lint, and build commands.
5. Open a pull request describing the change, any migration impact, and required environment setup.

Do not hand-edit generated `src/routeTree.gen.ts`. Never commit credentials, `.env` files, build output, or `node_modules`.

## Roadmap

See [`roadmap.md`](roadmap.md) for the current project roadmap. Planned improvements include media uploads, a videos page, search, and legal pages. Priorities may change as the prototype develops.

## Contact

For project questions or feedback, use the [website contact page](https://sanidhyaschoolofcodingcom.vercel.app/contact).
