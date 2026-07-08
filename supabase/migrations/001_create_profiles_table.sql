-- ==========================================
-- Aditya Store
-- Phase 4 - Database Schema
-- File: 001_create_profiles_table.sql
-- ==========================================

create extension if not exists "uuid-ossp";

create table if not exists public.profiles (

    id uuid primary key references auth.users(id) on delete cascade,

    full_name text,

    phone text,

    role text not null default 'customer'
        check (role in ('admin','customer')),

    avatar_url text,

    language text default 'en'
        check (language in ('en','hi')),

    address text,

    city text,

    state text,

    pincode text,

    is_active boolean default true,

    created_at timestamptz default now(),

    updated_at timestamptz default now()

);

alter table public.profiles enable row level security;
