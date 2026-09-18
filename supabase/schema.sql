-- South Coast Advisory — Supabase schema
-- Run in the Supabase SQL editor.
--
-- POPIA note: every table here holds personal information. Row level security
-- is enabled with NO anon policy, so only the service role (server-side, via
-- the API routes) can read or write. Never expose the service role key to the
-- browser.

create extension if not exists "pgcrypto";

-- ── Leads: hero form, contact page, service pages ────────────────────────────
create table if not exists public.leads (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  name          text not null,
  email         text not null,
  phone         text,
  message       text,
  service       text,
  source        text not null default 'website',
  consent_at    timestamptz not null,
  status        text not null default 'new'
    check (status in ('new','contacted','booked','client','closed')),
  notes         text
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);
alter table public.leads enable row level security;

-- ── Document downloads: who asked for what ───────────────────────────────────
-- The documents themselves live in the codebase (src/content/documents*.ts) and
-- are rendered to PDF at build time, so there is no documents table to keep in
-- sync. This records the request only.
create table if not exists public.downloads (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  document_slug   text not null,
  document_title  text not null,
  name            text not null,
  email           text not null,
  business_type   text,
  consent_at      timestamptz not null,
  marketing_optin boolean not null default false,
  followed_up     boolean not null default false
);

create index if not exists downloads_email_idx on public.downloads (email);
create index if not exists downloads_doc_idx on public.downloads (document_slug);
create index if not exists downloads_created_idx on public.downloads (created_at desc);
alter table public.downloads enable row level security;

-- ── Testimonials: submitted by clients, published only after approval ────────
-- Nothing reaches the website until status = 'approved'. Approve in the
-- Supabase table editor: open the row, set status, then redeploy or wait for
-- the page to revalidate.
create table if not exists public.testimonials (
  id             uuid primary key default gen_random_uuid(),
  created_at     timestamptz not null default now(),
  name           text not null,
  business       text,
  role           text,
  town           text,
  service        text,                       -- which service they are talking about
  years_client   text,
  rating         int check (rating between 1 and 5),
  quote          text not null,
  -- Explicit, separate permission to publish their name and business. POPIA.
  consent_publish_at timestamptz not null,
  contact_email  text not null,              -- so SCA can verify it is really them
  contact_phone  text,
  status         text not null default 'pending'
    check (status in ('pending','approved','rejected')),
  verified_by    text,                       -- who at SCA confirmed the client
  approved_at    timestamptz,
  display_order  int,
  featured       boolean not null default false,
  internal_notes text
);

create index if not exists testimonials_status_idx on public.testimonials (status);
create index if not exists testimonials_featured_idx on public.testimonials (featured);
alter table public.testimonials enable row level security;

-- Nothing below this line is optional reading:
--
-- 1. Approve a testimonial ONLY after confirming with the client that they
--    wrote it and are happy for their name and business to appear. The
--    consent_publish_at timestamp records that they ticked the box; a phone
--    call records that it was really them.
-- 2. Do NOT add Review or AggregateRating structured data for testimonials
--    collected and displayed on your own website. Google treats that as
--    self-serving review markup and it can attract a manual action. Display
--    them as ordinary content; collect star ratings on Google Business Profile
--    instead, where they count.
