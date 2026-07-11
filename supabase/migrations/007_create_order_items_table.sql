-- ==========================================
-- Aditya Store
-- Order Items
-- ==========================================

create table if not exists public.order_items (

    id uuid primary key default gen_random_uuid(),

    order_id uuid not null references public.orders(id) on delete cascade,

    product_id uuid not null references public.products(id),

    product_name text not null,

    price numeric(10,2) not null,

    quantity integer not null,

    total numeric(10,2) not null,

    created_at timestamptz default now()

);

alter table public.order_items enable row level security;

create policy "Users view own order items"
on public.order_items
for select
using (
exists(
select 1
from public.orders
where orders.id=order_items.order_id
and orders.user_id=auth.uid()
)
);

create policy "Admins manage order items"
on public.order_items
for all
using (
exists(
select 1
from public.profiles
where profiles.id=auth.uid()
and profiles.role='admin'
)
);

create index idx_order_items_order
on public.order_items(order_id);
