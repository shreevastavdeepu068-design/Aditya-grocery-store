-- ==========================================
-- Aditya Store
-- Cart Items Table
-- ==========================================

create table if not exists public.cart_items (

    id uuid primary key default gen_random_uuid(),

    user_id uuid not null references auth.users(id) on delete cascade,

    product_id uuid not null references public.products(id) on delete cascade,

    quantity integer not null default 1,

    created_at timestamptz default now(),

    updated_at timestamptz default now(),

    unique(user_id, product_id)

);

alter table public.cart_items enable row level security;

create policy "Users manage their own cart"
on public.cart_items
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create index idx_cart_user
on public.cart_items(user_id);

create index idx_cart_product
on public.cart_items(product_id);
