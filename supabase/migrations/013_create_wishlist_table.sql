-- ==========================================
-- Aditya Store
-- Wishlist Table
-- ==========================================

create table if not exists public.wishlist (

    id uuid primary key default gen_random_uuid(),

    user_id uuid not null references auth.users(id) on delete cascade,

    product_id uuid not null references public.products(id) on delete cascade,

    created_at timestamptz default now(),

    unique(user_id, product_id)

);

alter table public.wishlist enable row level security;

create policy "Users manage own wishlist"
on public.wishlist
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create index idx_wishlist_user
on public.wishlist(user_id);

create index idx_wishlist_product
on public.wishlist(product_id);
