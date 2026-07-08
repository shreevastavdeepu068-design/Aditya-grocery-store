-- ==========================================
-- Aditya Store
-- Product Images Table
-- ==========================================

create table if not exists public.product_images (

    id uuid primary key default gen_random_uuid(),

    product_id uuid not null references public.products(id) on delete cascade,

    image_url text not null,

    alt_text text,

    is_primary boolean default false,

    sort_order integer default 0,

    created_at timestamptz default now()

);

alter table public.product_images enable row level security;

create policy "Anyone can view product images"
on public.product_images
for select
using (true);

create policy "Admins can manage product images"
on public.product_images
for all
using (
    exists (
        select 1
        from public.profiles
        where profiles.id = auth.uid()
        and profiles.role='admin'
    )
);

create index idx_product_images_product
on public.product_images(product_id);
