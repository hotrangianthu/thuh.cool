# Supabase Database Setup

## Migrations

Run migrations in order in the Supabase SQL Editor:

1. `00000_init.sql` - Initialize extensions
2. `00001_create_guestbook.sql` - Create guestbook table
3. `00002_create_newsletter.sql` - Create newsletter subscribers table

## Quick Setup

Copy and paste this combined script into Supabase SQL Editor:

```sql
-- Run all migrations at once
\i 00000_init.sql
\i 00001_create_guestbook.sql
\i 00002_create_newsletter.sql
```

Or run each file separately in the SQL Editor.

## Environment Variables

After setting up Supabase, you'll need these environment variables:

```env
# For Vercel (Frontend)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com

# For Render (Backend)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
CORS_ORIGIN=https://thuh.cool
```

## Row Level Security

- **Guestbook**: Public read/write (anyone can view and post)
- **Newsletter**: Public insert only (emails protected)

## Schema Diagram

```
┌─────────────────────────────────┐
│         guestbook               │
├─────────────────────────────────┤
│ id          UUID (PK)           │
│ name        VARCHAR(50)         │
│ message     VARCHAR(280)        │
│ created_at  TIMESTAMPTZ         │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│    newsletter_subscribers       │
├─────────────────────────────────┤
│ id              UUID (PK)       │
│ email           VARCHAR(255) UQ │
│ subscribed_at   TIMESTAMPTZ     │
│ is_active       BOOLEAN         │
│ unsubscribed_at TIMESTAMPTZ     │
└─────────────────────────────────┘
```

