-- ==========================================
-- Aditya Store
-- Delivery Addresses Table
-- ==========================================

create table if not exists public.delivery_addresses (

    id uuid primary key default gen_random_uuid(),

    user_id uuid not null references auth.users(id) on delete cascade,

    full_name text not null,

    phone text not null,

    address_line1 text not null,

    address_line2 text,

    landmark text,

    city text not null,

    state text not null,

    pincode text not null,

    latitude double precision,

    longitude double precision,

    is_default boolean default false,

    created_at timestamptz default now(),

    updated_at timestamptz default now()

);

alter table public.delivery_addresses enable row level security;

create policy "Users manage own addresses"
on public.delivery_addresses
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create index idx_addresses_user
on public.delivery_addresses(user_id);
