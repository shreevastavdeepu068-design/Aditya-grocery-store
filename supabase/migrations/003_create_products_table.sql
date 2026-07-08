-- ==========================================
-- Aditya Store
-- Products Table
-- ==========================================

create table if not exists public.products (

    id uuid primary key default uuid_generate_v4(),

    category_id uuid references public.categories(id) on delete set null,

    name text not null,

    hindi_name text,

    slug text unique not null,

    brand text,

    description text,

    image_url text,

    mrp numeric(10,2) not null,

    selling_price numeric(10,2) not null,

    stock integer default 0,

    unit text default 'pcs',

    weight text,

    featured boolean default false,

    bestseller boolean default false,

    is_available boolean default true,

    created_at timestamptz default now(),

    updated_at timestamptz default now()

);

alter table public.products enable row level security;

create policy "Anyone can view available products"
on public.products
for select
using (is_available = true);

create policy "Admins can manage products"
on public.products
for all
using (
    exists (
        select 1
        from public.profiles
        where profiles.id = auth.uid()
        and profiles.role = 'admin'
    )
);

create index idx_products_category
on public.products(category_id);

create index idx_products_name
on public.products(name);

create index idx_products_featured
on public.products(featured);

create index idx_products_available
on public.products(is_available);
