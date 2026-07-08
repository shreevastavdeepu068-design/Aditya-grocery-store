-- ==========================================
-- Aditya Store
-- Banners Table
-- ==========================================

create table if not exists public.banners (

    id uuid primary key default gen_random_uuid(),

    title text not null,

    subtitle text,

    image_url text not null,

    button_text text,

    button_link text,

    display_order integer default 0,

    is_active boolean default true,

    start_date timestamptz,

    end_date timestamptz,

    created_at timestamptz default now(),

    updated_at timestamptz default now()

);

alter table public.banners enable row level security;

create policy "Anyone can view active banners"
on public.banners
for select
using (is_active = true);

create policy "Admins manage banners"
on public.banners
for all
using (
exists(
select 1
from public.profiles
where profiles.id = auth.uid()
and profiles.role='admin'
)
);

create index idx_banners_active
on public.banners(is_active);

create index idx_banners_order
on public.banners(display_order);
