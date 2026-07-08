-- ==========================================
-- Aditya Store
-- Product Reviews Table
-- ==========================================

create table if not exists public.product_reviews (

    id uuid primary key default gen_random_uuid(),

    product_id uuid not null references public.products(id) on delete cascade,

    user_id uuid not null references auth.users(id) on delete cascade,

    rating integer not null check (rating between 1 and 5),

    review text,

    created_at timestamptz default now(),

    updated_at timestamptz default now()

);

alter table public.product_reviews enable row level security;

create policy "Anyone can view reviews"
on public.product_reviews
for select
using (true);

create policy "Users manage own reviews"
on public.product_reviews
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create index idx_reviews_product
on public.product_reviews(product_id);

create index idx_reviews_user
on public.product_reviews(user_id);
