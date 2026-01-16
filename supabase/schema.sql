  -- Enable necessary extensions
  create extension if not exists "uuid-ossp";

  -- Contact Messages Table
  create table public.contact_messages (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    email text not null,
    message text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
  );

  -- Turn on Row Level Security (RLS)
  alter table public.contact_messages enable row level security;

  -- Allow anyone to insert (anon users submitting the form)
  create policy "Anyone can insert contact messages"
  on public.contact_messages for insert
  with check (true);

  -- Only authenticated admins can view messages (assuming you'll add auth later, or use the dashboard)
  -- For now, we'll leave read access restrictive or open depending on your needs.
  -- Defaulting to: No public read access.

  -- Blog Posts Table
  create table public.posts (
    id uuid primary key default uuid_generate_v4(),
    slug text not null unique,
    title text not null,
    content text, -- Markdown or HTML
    published boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
  );

  alter table public.posts enable row level security;

  -- Everyone can read published posts
  create policy "Public can read published posts"
  on public.posts for select
  using (published = true);

  -- Only admins can insert/update/delete (You will need to setup Auth policies for your user ID)
  -- create policy "Admins can manage posts" ...
