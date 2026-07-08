-- ==========================================
-- Aditya Store
-- Orders Table
-- ==========================================

create table if not exists public.orders (

    id uuid primary key default gen_random_uuid(),

    user_id uuid not null references auth.users(id) on delete cascade,

    order_number text unique not null,

    customer_name text not null,

    customer_phone text not null,

    delivery_address text not null,

    payment_method text not null
        check (payment_method in ('cod','upi','razorpay')),

    payment_status text default 'pending'
        check (payment_status in ('pending','paid','failed','refunded')),

    order_status text default 'pending'
        check (order_status in ('pending','confirmed','packed','out_for_delivery','delivered','cancelled')),

    subtotal numeric(10,2) not null default 0,

    delivery_charge numeric(10,2) default 0,

    discount numeric(10,2) default 0,

    total_amount numeric(10,2) not null,

    notes text,

    created_at timestamptz default now(),

    updated_at timestamptz default now()

);

alter table public.orders enable row level security;

create policy "Users can view own orders"
on public.orders
for select
using (auth.uid() = user_id);

create policy "Users can create own orders"
on public.orders
for insert
with check (auth.uid() = user_id);

create policy "Admins manage orders"
on public.orders
for all
using (
exists(
select 1
from public.profiles
where profiles.id=auth.uid()
and profiles.role='admin'
)
);
