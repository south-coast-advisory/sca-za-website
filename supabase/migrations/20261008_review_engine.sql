-- Review engine (8 Oct 2026). Run once in Supabase → SQL Editor → New query → Run.
-- Safe to run twice: every statement checks before it changes anything.

-- 1. New review fields on the existing testimonials table.
alter table public.testimonials add column if not exists headline     text;
alter table public.testimonials add column if not exists answers_json jsonb;   -- guided question + answer pairs
alter table public.testimonials add column if not exists review_type  text not null default 'written';
alter table public.testimonials add column if not exists video_path   text;    -- path inside the review-videos bucket
alter table public.testimonials add column if not exists service_slug text;    -- which service page it belongs to

do $$ begin
  alter table public.testimonials
    add constraint testimonials_review_type_chk check (review_type in ('written','video'));
exception when duplicate_object then null; end $$;

create index if not exists testimonials_service_slug_idx on public.testimonials (service_slug);

-- 2. Private bucket for video reviews. Private on purpose: an unapproved video
--    must never be publicly reachable. The site uploads with signed URLs and
--    Neil receives a 7-day viewing link by email. 200 MB limit, video only.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('review-videos', 'review-videos', false, 209715200,
        array['video/webm','video/mp4','video/quicktime'])
on conflict (id) do nothing;
