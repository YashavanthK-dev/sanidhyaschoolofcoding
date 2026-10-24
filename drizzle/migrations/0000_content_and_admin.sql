create type public.app_role as enum ('admin');
create type public.content_status as enum ('draft','published','archived');
create type public.content_level as enum ('Beginner','Intermediate','Advanced');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "read own roles" on public.user_roles for select to authenticated using (user_id = auth.uid());

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

-- The very first account created becomes the founder/admin. Later accounts get no role.
create or replace function public.grant_first_admin()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  perform pg_advisory_xact_lock(424242);
  if not exists (select 1 from public.user_roles where role = 'admin') then
    insert into public.user_roles (user_id, role) values (new.id, 'admin');
  end if;
  return new;
end $$;
create trigger on_auth_user_created_admin after insert on auth.users
  for each row execute function public.grant_first_admin();

create or replace function public.touch_updated_at()
returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end $$;

create table public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text not null default '',
  category text not null default 'Programming',
  level content_level not null default 'Beginner',
  duration text not null default '',
  lessons int not null default 0,
  tags text[] not null default '{}',
  outcomes text[] not null default '{}',
  modules jsonb not null default '[]',
  status content_status not null default 'draft',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text not null default '',
  level content_level not null default 'Beginner',
  stack text[] not null default '{}',
  status content_status not null default 'draft',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table public.learning_paths (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text not null default '',
  duration text not null default '',
  steps text[] not null default '{}',
  status content_status not null default 'draft',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table public.resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  type text not null default 'Notes' check (type in ('Notes','Article','Cheatsheet','Video')),
  topic text not null default '',
  summary text not null default '',
  url text,
  status content_status not null default 'draft',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

do $$ declare t text; begin
  foreach t in array array['courses','projects','learning_paths','resources'] loop
    execute format('grant select on public.%I to anon', t);
    execute format('grant select, insert, update, delete on public.%I to authenticated', t);
    execute format('grant all on public.%I to service_role', t);
    execute format('alter table public.%I enable row level security', t);
    execute format('create policy "public reads published" on public.%I for select to anon, authenticated using (status = ''published'')', t);
    execute format('create policy "admin reads all" on public.%I for select to authenticated using (public.has_role(auth.uid(), ''admin''))', t);
    execute format('create policy "admin inserts" on public.%I for insert to authenticated with check (public.has_role(auth.uid(), ''admin''))', t);
    execute format('create policy "admin updates" on public.%I for update to authenticated using (public.has_role(auth.uid(), ''admin'')) with check (public.has_role(auth.uid(), ''admin''))', t);
    execute format('create policy "admin deletes" on public.%I for delete to authenticated using (public.has_role(auth.uid(), ''admin''))', t);
    execute format('create trigger touch_%I before update on public.%I for each row execute function public.touch_updated_at()', t, t);
  end loop;
end $$;

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 100),
  email text not null check (char_length(email) between 3 and 255),
  message text not null check (char_length(message) between 1 and 2000),
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);
grant insert on public.contact_messages to anon, authenticated;
grant select, update, delete on public.contact_messages to authenticated;
grant all on public.contact_messages to service_role;
alter table public.contact_messages enable row level security;
create policy "anyone can send" on public.contact_messages for insert to anon, authenticated with check (is_read = false);
create policy "admin reads messages" on public.contact_messages for select to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "admin updates messages" on public.contact_messages for update to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "admin deletes messages" on public.contact_messages for delete to authenticated using (public.has_role(auth.uid(),'admin'));

insert into public.courses (slug,title,summary,category,level,duration,lessons,tags,outcomes,modules,status,sort_order) values
('python-from-zero','Python from Zero to Builder','Learn Python by writing real programs — scripts, automations and a small web API.','Programming','Beginner','6 weeks',32,'{Python,Fundamentals}','{"Write clean Python programs","Work with files, APIs and data","Build a REST API with FastAPI"}','[{"title":"Foundations","lessons":["Variables & types","Control flow","Functions"]},{"title":"Working with data","lessons":["Lists & dicts","Files & JSON","Error handling"]},{"title":"Build","lessons":["Automation script","Intro to FastAPI","Deploy your API"]}]','published',1),
('full-stack-javascript','Full-Stack JavaScript & TypeScript','From the browser to the database — build and ship a complete web application.','Web Development','Intermediate','10 weeks',54,'{JavaScript,TypeScript,React,SQL}','{"Build interfaces with React","Design typed APIs","Model data with SQL"}','[{"title":"Modern JavaScript","lessons":["ES modules","Async & promises","TypeScript basics"]},{"title":"Frontend","lessons":["React components","State & data fetching","Forms"]},{"title":"Backend","lessons":["HTTP & REST","Postgres & SQL","Authentication"]}]','published',2),
('generative-ai-for-developers','Generative AI for Developers','Understand how LLMs work and build practical AI features into your own apps.','Artificial Intelligence','Intermediate','5 weeks',24,'{AI,LLMs,Python}','{"Explain how LLMs generate text","Write effective prompts","Build a retrieval-based assistant"}','[{"title":"How models work","lessons":["Tokens & embeddings","Transformers, simply","Limits & risks"]},{"title":"Building","lessons":["Prompt design","Calling model APIs","Retrieval (RAG)"]}]','published',3),
('secure-development','Cybersecurity & Secure Development','Think like an attacker, code like a defender. The OWASP Top 10 with hands-on labs.','Cybersecurity','Intermediate','6 weeks',28,'{Security,OWASP,Web}','{"Spot common vulnerabilities","Fix injection & XSS","Handle auth and secrets safely"}','[{"title":"Threats","lessons":["Threat modelling","Injection","XSS & CSRF"]},{"title":"Defence","lessons":["Auth done right","Secrets management","Security reviews"]}]','published',4),
('sql-and-databases','SQL & Database Design','Model data properly, write queries with confidence and make them fast.','Databases','Beginner','4 weeks',20,'{SQL,Postgres}','{"Design normalised schemas","Write joins and aggregates","Use indexes well"}','[{"title":"Querying","lessons":["SELECT basics","Joins","Grouping"]},{"title":"Design","lessons":["Normalisation","Constraints","Indexes"]}]','published',5),
('cloud-and-devops','Cloud & DevOps Essentials','Containers, CI/CD and cloud deployment — get your code running in production.','Cloud & DevOps','Advanced','6 weeks',30,'{Docker,CI/CD,Cloud}','{"Containerise applications","Automate tests and deploys","Monitor running services"}','[{"title":"Containers","lessons":["Docker basics","Compose","Images that stay small"]},{"title":"Delivery","lessons":["CI pipelines","Cloud deploys","Observability"]}]','published',6);

insert into public.projects (slug,title,summary,level,stack,status,sort_order) values
('expense-tracker-api','Expense Tracker API','A typed REST API with auth, Postgres and tests.','Intermediate','{TypeScript,Postgres}','published',1),
('ai-study-buddy','AI Study Buddy','Chat with your own notes using retrieval and an LLM.','Advanced','{Python,LLMs}','published',2),
('portfolio-site','Developer Portfolio','A fast, accessible personal site you''ll actually ship.','Beginner','{HTML,CSS,React}','published',3),
('password-auditor','Password Strength Auditor','Check passwords against breach data, safely.','Intermediate','{Python,Security}','published',4),
('realtime-chat','Realtime Chat App','WebSockets, rooms and presence from scratch.','Advanced','{Node.js,WebSockets}','published',5),
('cli-todo','Command-Line Task Manager','Your first useful tool: a CLI with saved data.','Beginner','{Python}','published',6);

insert into public.learning_paths (slug,title,summary,duration,steps,status,sort_order) values
('web-developer','Become a Web Developer','From your first HTML page to deploying full-stack apps.','6 months','{"SQL & Database Design","Full-Stack JavaScript & TypeScript","Developer Portfolio","Cloud & DevOps Essentials"}','published',1),
('ai-engineer','AI Engineer Track','Programming foundations to building real AI products.','5 months','{"Python from Zero to Builder","SQL & Database Design","Generative AI for Developers","AI Study Buddy"}','published',2),
('security-minded-dev','Security-Minded Developer','Write software that holds up against real attackers.','4 months','{"Python from Zero to Builder","Cybersecurity & Secure Development","Password Strength Auditor"}','published',3);

insert into public.resources (title,type,topic,summary,status,sort_order) values
('Python Cheatsheet','Cheatsheet','Python','Syntax, collections and idioms on one page.','published',1),
('How the Web Actually Works','Article','Web','DNS, HTTP and the browser, explained plainly.','published',2),
('SQL Joins, Visually','Notes','Databases','Every join type with diagrams and examples.','published',3),
('Git in 20 Minutes','Video','Tools','Commit, branch and merge without the fear.','published',4),
('OWASP Top 10 Notes','Notes','Security','Each risk, an example and how to fix it.','published',5),
('Prompting Patterns','Article','AI','Reliable patterns for working with LLMs.','published',6);