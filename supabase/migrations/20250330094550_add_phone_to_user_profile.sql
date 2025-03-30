-- Add the phone column as a text field
alter table if exists public.user_profiles add column if not exists phone text;