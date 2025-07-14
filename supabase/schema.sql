create table if not exists users (
  id uuid primary key default uuid_generate_v4(),
  email text unique,
  role text
);

create table if not exists galleries (
  id uuid primary key default uuid_generate_v4(),
  owner uuid references users(id)
);

create table if not exists images (
  id uuid primary key default uuid_generate_v4(),
  gallery_id uuid references galleries(id),
  path text
);

create table if not exists assignments (
  id serial primary key,
  gallery_id uuid references galleries(id),
  user_id uuid references users(id)
);

-- enable RLS
alter table images enable row level security;
alter table galleries enable row level security;

-- RLS policies
create policy customer_read on images
  for select using (exists (select 1 from assignments a where a.gallery_id = gallery_id and a.user_id = auth.uid()));

create policy admin_full on images
  for all using (auth.role() = 'service_role');
