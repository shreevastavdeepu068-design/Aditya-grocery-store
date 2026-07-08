-- ==========================================
-- Aditya Store
-- Notifications Table
-- ==========================================

create table if not exists public.notifications (

    id uuid primary key default gen_random_uuid(),

    user_id uuid references auth.users(id) on delete cascade,

    title text not null,

    message text not null,

    notification_type text default 'general'
        check (
            notification_type in (
                'general',
                'order',
                'offer',
                'payment'
            )
        ),

    is_read boolean default false,

    created_at timestamptz default now()

);

alter table public.notifications enable row level security;

create policy "Users view own notifications"
on public.notifications
for select
using (auth.uid() = user_id);

create policy "Admins manage notifications"
on public.notifications
for all
using (
exists(
select 1
from public.profiles
where profiles.id = auth.uid()
and profiles.role='admin'
)
);

create index idx_notifications_user
on public.notifications(user_id);

create index idx_notifications_read
on public.notifications(is_read);
