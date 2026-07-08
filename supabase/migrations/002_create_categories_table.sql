-- ==========================================
-- Aditya Store
-- Categories Table
-- ==========================================

create table if not exists public.categories (

    id uuid primary key default uuid_generate_v4(),

    name text not null,

    slug text unique not null,

    image_url text,

    description text,

    sort_order integer default 0,

    is_active boolean default true,

    created_at timestamptz default now(),

    updated_at timestamptz default now()

);

alter table public.categories enable row level security;

create policy "Anyone can view active categories"
on public.categories
for select
using (is_active = true);

create policy "Admins can manage categories"
on public.categories
for all
using (
    exists (
        select 1
        from public.profiles
        where profiles.id = auth.uid()
        and profiles.role = 'admin'
    )
);
