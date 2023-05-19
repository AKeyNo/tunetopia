-- Profile table
create table profile (
  id uuid references auth.users not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  summary text,
  image text,

  constraint username_length check (char_length(username) >= 3)
);
alter table profile enable row level security;

-- Artist table
CREATE TABLE artist (
    artist_id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    location TEXT,
    year_formed TIMESTAMP,
    is_solo BOOLEAN,
    image TEXT
);
alter table artist enable row level security;
CREATE POLICY "Enable read access for all users" ON "public"."artist"
AS PERMISSIVE FOR SELECT
TO public
USING (true)

-- Song table
CREATE TABLE song (
    song_id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    artist_id BIGINT NOT NULL,
    album_id BIGINT,
    FOREIGN KEY (artist_id) REFERENCES artist (artist_id),
    FOREIGN KEY (album_id) REFERENCES album (album_id)
);
alter table song enable row level security;
CREATE POLICY "Enable read access for all users" ON "public"."song"
AS PERMISSIVE FOR SELECT
TO public
USING (true)

-- Album table
CREATE TABLE album (
    album_id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    release_year INTEGER,
    label TEXT,
    genre TEXT
);
alter table album enable row level security;
CREATE POLICY "Enable read access for all users" ON "public"."album"
AS PERMISSIVE FOR SELECT
TO public
USING (true)

-- AlbumArtist junction table
CREATE TABLE album_artist (
    album_id BIGINT,
    artist_id BIGINT,
    PRIMARY KEY (album_id, artist_id),
    FOREIGN KEY (album_id) REFERENCES album (album_id),
    FOREIGN KEY (artist_id) REFERENCES artist (artist_id)
);
alter table album_artist enable row level security;
CREATE POLICY "Enable read access for all users" ON "public"."album_artist"
AS PERMISSIVE FOR SELECT
TO public
USING (true)

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
create function public.handle_new_user()
returns trigger as $$
declare
  new_username varchar(50) := new.raw_user_meta_data->>'username';
begin
  if exists (select username from public.profile where username=new_username) then
    raise exception 'Username "%" is already taken!', new_username;
  else
    insert into public.profile (id, username)
    values (new.id, new_username);
    return new;
  end if;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();