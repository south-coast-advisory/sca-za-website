-- Consultation bookings (8 Oct 2026). Run once in Supabase → SQL Editor → Run.
-- Safe to run twice.

create table if not exists public.consultation_bookings (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  start_at         timestamptz not null,
  duration_minutes int not null default 20,
  format           text not null default 'phone' check (format in ('phone','video','office')),
  name             text not null,
  email            text not null,
  phone            text not null,
  business         text,
  topic            text,
  consent_at       timestamptz not null,           -- POPIA: consent to be contacted
  cancel_token     uuid not null unique,           -- private link in the confirmation email
  status           text not null default 'confirmed' check (status in ('confirmed','cancelled','completed','no_show')),
  cancelled_at     timestamptz,
  internal_notes   text
);

-- Double-booking is impossible: one confirmed booking per start time.
-- Cancelled bookings drop out of the index, so the slot frees at once.
create unique index if not exists consultation_bookings_one_per_slot
  on public.consultation_bookings (start_at) where status = 'confirmed';

create index if not exists consultation_bookings_start_idx on public.consultation_bookings (start_at);

alter table public.consultation_bookings enable row level security;
-- No policies: only the server (service role) reads or writes this table.
