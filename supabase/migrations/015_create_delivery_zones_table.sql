-- ==========================================
-- Aditya Store
-- Delivery Zones Table
-- ==========================================

create table if not exists public.delivery_zones (

    id uuid primary key default gen_random_uuid(),

    zone_name text not null,

    city text,

    delivery_radius_km integer default 15,

    minimum_order numeric(10,2) default 0,

    delivery_charge numeric(10,2) default 0,

    free_delivery_above numeric(10,2) default 500,

    is_active boolean default true,

    created_at timestamptz default now(),

    updated_at timestamptz default now()

);

alter table public.delivery_zones enable row level security;

create policy "Anyone can view delivery zones"
on public.delivery_zones
for select
using (is_active = true);

create policy "Admins manage delivery zones"
on public.delivery_zones
for all
using (
    exists (
        select 1
        from public.profiles
        where profiles.id = auth.uid()
          and profiles.role = 'admin'
    )
);

create index idx_delivery_zones_active
on public.delivery_zones(is_active);
