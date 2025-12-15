# thuh.cool

Personal digital vault of ThuH - A minimalist personal website inspired by mattpalmer.io

## Features

- **Immersive Home Page**: Full-screen oil painting background with animated activity ticker
- **Writing Section**: Clean, readable blog/vault for thoughts and articles
- **Guestbook**: Interactive guestbook powered by Supabase
- **Newsletter Signup**: Email collection for updates
- **About Page**: Personal introduction

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Cloudflare     │────▶│     Vercel      │────▶│    Supabase     │
│   (CDN/WAF)     │     │   (Frontend)    │     │   (Database)    │
│                 │     │   Next.js App   │     │   PostgreSQL    │
│                 │     │                 │     │                 │
│                 │     │     Render      │     │                 │
│                 │     │   (Backend)     │     │                 │
│                 │     │  Express API    │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## Tech Stack

| Layer | Technology | Deployment |
|-------|------------|------------|
| CDN/Security | Cloudflare (DNS, CDN, WAF, DDoS Protection) | Cloudflare |
| Frontend | Next.js 14, TypeScript, Tailwind CSS | Vercel |
| Backend | Express.js, TypeScript, Zod | Render |
| Database | PostgreSQL | Supabase |
| Fonts | Kaushan Script, Inter | Google Fonts |

## Project Structure

```
thuh.cool/
├── src/                    # Frontend (Next.js)
│   ├── app/               # App Router pages
│   ├── components/        # React components
│   ├── lib/              # Utilities
│   └── types/            # TypeScript types
├── backend/               # Backend API (Express)
│   └── src/
│       ├── routes/       # API routes
│       └── lib/          # Backend utilities
├── supabase/             # Database
│   └── migrations/       # SQL migration files
├── vercel.json           # Vercel configuration
└── render.yaml           # Render blueprint
```

## Quick Start (Local Development)

### 1. Clone and Install

```bash
git clone <repository-url>
cd thuh.cool

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend && npm install && cd ..
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run migrations from `supabase/migrations/` in order:
   - `00000_init.sql`
   - `00001_create_guestbook.sql`
   - `00002_create_newsletter.sql`
3. Copy your project URL and keys from Settings → API

### 3. Configure Environment

```bash
# Frontend
cp env.example .env.local
# Edit .env.local with your Supabase credentials

# Backend
cd backend
cp env.example .env
# Edit .env with your Supabase service role key
```

### 4. Run Development Servers

```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
npm run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## Deployment

### Step 1: Database (Supabase)

Already set up in Quick Start. Note your:
- Project URL: `https://xxx.supabase.co`
- Anon Key: For frontend
- Service Role Key: For backend (keep secret!)

### Step 2: Backend (Render)

1. Push code to GitHub
2. In [Render Dashboard](https://dashboard.render.com):
   - Click "New" → "Blueprint"
   - Connect your repository
   - Render detects `render.yaml` automatically
3. Add environment variables:
   - `SUPABASE_URL`: Your Supabase project URL
   - `SUPABASE_SERVICE_ROLE_KEY`: Your service role key
4. Deploy! Note your backend URL: `https://xxx.onrender.com`

### Step 3: Frontend (Vercel + Cloudflare)

**See detailed guide**: [`docs/VERCEL_CLOUDFLARE_SETUP.md`](docs/VERCEL_CLOUDFLARE_SETUP.md)

**Recommended Setup: Vercel + Cloudflare Proxy**

This setup provides:
- ✅ Native Next.js support (no code changes)
- ✅ Enterprise-grade security (DDoS protection, WAF)
- ✅ Global CDN performance
- ✅ Zero configuration complexity

**Quick Steps:**

1. **Deploy to Vercel:**
   - Import repository in [Vercel Dashboard](https://vercel.com/dashboard)
   - Add environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `BACKEND_URL`
   - Deploy!

2. **Configure Cloudflare:**
   - Add domain to [Cloudflare](https://dash.cloudflare.com)
   - Update nameservers at your registrar
   - Add CNAME record pointing to Vercel (with proxy enabled 🟠)
   - Set SSL/TLS to "Full (strict)"

3. **Verify:**
   - Test `https://thuh.cool`
   - Update Supabase redirect URLs
   - Update Google OAuth settings

**Alternative: Vercel Only**
- Skip Cloudflare setup if you don't need extra security/CDN
- Just add custom domain in Vercel dashboard
- See [Vercel docs](https://vercel.com/docs) for details

## Environment Variables Reference

### Frontend (Vercel)

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `BACKEND_URL` | Render backend URL |

### Backend (Render)

| Variable | Description |
|----------|-------------|
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key |
| `CORS_ORIGIN` | Allowed frontend origins |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/guestbook` | Fetch guestbook messages |
| POST | `/api/guestbook` | Create a message |
| POST | `/api/newsletter` | Subscribe to newsletter |
| GET | `/health` | Backend health check |

## Design Philosophy

- **Minimalist**: Clean, focused design
- **Performance**: Optimized images, edge caching
- **Accessibility**: Semantic HTML, ARIA labels
- **Security**: Rate limiting, input validation, CORS

## License

MIT
