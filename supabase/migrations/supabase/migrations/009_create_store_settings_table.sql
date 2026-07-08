-- ==========================================
-- Aditya Store
-- Store Settings
-- ==========================================

create table if not exists public.store_settings (

    id uuid primary key default gen_random_uuid(),

    store_name text not null,

    owner_name text,

    phone text,

    whatsapp text,

    email text,

    address text,

    city text,

    state text,

    pincode text,

    delivery_radius_km integer default 15,

    minimum_order numeric(10,2) default 0,

    delivery_charge numeric(10,2) default 0,

    free_delivery_above numeric(10,2) default 500,

    currency text default 'INR',

    language text default 'both',

    is_store_open boolean default true,

    created_at timestamptz default now(),

    updated_at timestamptz default now()

);

alter table public.store_settings enable row level security;

create policy "Anyone can view store settings"
on public.store_settings
for select
using (true);

create policy "Admins manage store settings"
on public.store_settings
for all
using (
exists(
select 1
from public.profiles
where profiles.id=auth.uid()
and profiles.role='admin'
)
);
