-- ==========================================
-- Aditya Store
-- Coupons Table
-- ==========================================

create table if not exists public.coupons (

    id uuid primary key default gen_random_uuid(),

    code text unique not null,

    title text,

    description text,

    discount_type text not null
        check (discount_type in ('percentage','fixed')),

    discount_value numeric(10,2) not null,

    minimum_order numeric(10,2) default 0,

    maximum_discount numeric(10,2),

    usage_limit integer,

    used_count integer default 0,

    start_date timestamptz,

    expiry_date timestamptz,

    is_active boolean default true,

    created_at timestamptz default now(),

    updated_at timestamptz default now()

);

alter table public.coupons enable row level security;

create policy "Anyone can view active coupons"
on public.coupons
for select
using (is_active = true);

create policy "Admins manage coupons"
on public.coupons
for all
using (
exists(
select 1
from public.profiles
where profiles.id=auth.uid()
and profiles.role='admin'
)
);

create index idx_coupon_code
on public.coupons(code);
