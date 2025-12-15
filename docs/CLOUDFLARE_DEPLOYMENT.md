# Cloudflare Pages Deployment Guide (Alternative)

**Note**: This is an alternative deployment option. For the recommended setup, see [`VERCEL_CLOUDFLARE_SETUP.md`](VERCEL_CLOUDFLARE_SETUP.md) which uses Vercel + Cloudflare proxy for better Next.js compatibility.

This guide will help you deploy the Next.js frontend to Cloudflare Pages directly (without Vercel).

## Prerequisites

- A Cloudflare account (free tier works)
- Your domain `thuh.cool` (or you can use a Cloudflare Pages subdomain)
- GitHub repository with your code

## Step 1: Install Cloudflare Next.js Adapter

Cloudflare Pages requires a special build adapter for Next.js. Install it:

```bash
npm install --save-dev @cloudflare/next-on-pages
```

## Step 2: Update package.json Scripts

Add a build script for Cloudflare:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "build:cloudflare": "next build && npx @cloudflare/next-on-pages",
    "start": "next start",
    "lint": "next lint"
  }
}
```

## Step 3: Create Cloudflare Configuration

Create `wrangler.toml` in the root directory:

```toml
name = "thuh-cool"
compatibility_date = "2024-01-01"
pages_build_output_dir = ".vercel/output/static"

[env.production]
vars = { ENVIRONMENT = "production" }
```

## Step 4: Update next.config.js

Update your `next.config.js` to work with Cloudflare:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    // Cloudflare Pages supports remote images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  poweredByHeader: false,
  compress: true,
  // Important for Cloudflare Pages
  output: 'standalone',
}

module.exports = nextConfig
```

## Step 5: Deploy to Cloudflare Pages

### Option A: Via Cloudflare Dashboard (Recommended)

1. **Go to Cloudflare Dashboard**
   - Visit: https://dash.cloudflare.com
   - Navigate to "Workers & Pages" → "Pages"
   - Click "Create a project"

2. **Connect Your Repository**
   - Click "Connect to Git"
   - Authorize Cloudflare to access your GitHub account
   - Select your `thuh.cool` repository

3. **Configure Build Settings**
   - **Framework preset**: Next.js (Static HTML Export) - **BUT** we'll override this
   - **Build command**: `npm run build:cloudflare`
   - **Build output directory**: `.vercel/output/static`
   - **Root directory**: `/` (leave as root)

4. **Set Environment Variables**
   Click "Add environment variable" and add:
   
   | Variable | Value |
   |----------|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
   | `BACKEND_URL` | Your Render backend URL (e.g., `https://xxx.onrender.com`) |
   | `NODE_VERSION` | `18` or `20` |

5. **Deploy**
   - Click "Save and Deploy"
   - Cloudflare will build and deploy your site
   - Note your Pages URL: `https://xxx.pages.dev`

### Option B: Via Wrangler CLI

1. **Install Wrangler CLI**
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare**
   ```bash
   wrangler login
   ```

3. **Build and Deploy**
   ```bash
   npm run build:cloudflare
   wrangler pages deploy .vercel/output/static --project-name=thuh-cool
   ```

## Step 6: Configure Custom Domain

1. **In Cloudflare Pages Dashboard**
   - Go to your project → "Custom domains"
   - Click "Set up a custom domain"
   - Enter `thuh.cool`

2. **DNS Configuration**
   - Cloudflare will automatically configure DNS if your domain is on Cloudflare
   - If not, add a CNAME record:
     - **Name**: `@` (or `www` for www.thuh.cool)
     - **Target**: `xxx.pages.dev` (your Pages URL)
     - **Proxy status**: Proxied (orange cloud)

3. **SSL/TLS**
   - Cloudflare automatically provisions SSL certificates
   - Wait 5-10 minutes for SSL to activate

## Step 7: Configure API Routes (Important!)

Since Cloudflare Pages handles API routes differently, you have two options:

### Option A: Use Backend API (Recommended)

Your API routes (`/api/guestbook`, `/api/newsletter`) should proxy to your Render backend. Update your Next.js API routes to forward requests:

```typescript
// src/app/api/guestbook/route.ts
export async function GET() {
  const backendUrl = process.env.BACKEND_URL
  if (backendUrl) {
    const response = await fetch(`${backendUrl}/api/guestbook`)
    return Response.json(await response.json())
  }
  // Fallback for local development
  // ... existing code
}
```

### Option B: Use Cloudflare Functions

If you want to keep API routes on Cloudflare, you'll need to convert them to Cloudflare Functions format (more complex).

## Step 8: Update Supabase Redirect URLs

After deployment, update Supabase authentication redirect URLs:

1. Go to Supabase Dashboard → Authentication → URL Configuration
2. Add your Cloudflare Pages URL:
   ```
   https://thuh.cool/auth/callback
   https://www.thuh.cool/auth/callback
   https://xxx.pages.dev/auth/callback
   ```

## Step 9: Update Google OAuth Redirect URIs

Update Google Cloud Console OAuth settings:

1. Go to Google Cloud Console → APIs & Services → Credentials
2. Edit your OAuth 2.0 Client ID
3. Add to **Authorized redirect URIs**:
   ```
   https://<your-supabase-ref>.supabase.co/auth/v1/callback
   ```

## Troubleshooting

### Build Fails with "@cloudflare/next-on-pages" Error

- Make sure you've installed `@cloudflare/next-on-pages` as a dev dependency
- Check that your Node version is 18 or 20 in Cloudflare Pages settings

### API Routes Not Working

- Cloudflare Pages has limitations with Next.js API routes
- Consider using your Render backend for all API calls
- Or convert API routes to Cloudflare Functions

### Images Not Loading

- Check `next.config.js` has proper `remotePatterns` configuration
- Ensure image domains are whitelisted

### Environment Variables Not Working

- Make sure variables are prefixed with `NEXT_PUBLIC_` for client-side access
- Rebuild after adding new environment variables

### Custom Domain Not Working

- Wait 5-10 minutes for DNS propagation
- Check DNS records in Cloudflare dashboard
- Ensure SSL certificate is active (may take a few minutes)

## Differences from Vercel

| Feature | Vercel | Cloudflare Pages |
|---------|--------|------------------|
| **Next.js Support** | Native | Requires adapter |
| **API Routes** | Full support | Limited (use backend) |
| **Edge Functions** | Yes | Yes (Workers) |
| **Build Time** | Fast | Slightly slower |
| **Free Tier** | Generous | Very generous |
| **Custom Domain** | Easy | Easy |
| **SSL** | Automatic | Automatic |

## Cost Comparison

- **Cloudflare Pages**: Free (unlimited requests, 500 builds/month)
- **Vercel**: Free (100GB bandwidth, unlimited builds)

Both are excellent choices, but Cloudflare offers more generous free tier limits.

## Next Steps

1. ✅ Deploy to Cloudflare Pages
2. ✅ Configure custom domain
3. ✅ Update Supabase redirect URLs
4. ✅ Update Google OAuth settings
5. ✅ Test all functionality
6. ✅ Monitor performance in Cloudflare dashboard

## Additional Resources

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Next.js on Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/nextjs/)
- [@cloudflare/next-on-pages](https://github.com/cloudflare/next-on-pages)

