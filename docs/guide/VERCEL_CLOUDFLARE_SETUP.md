# Vercel + Cloudflare Proxy Setup Guide

This guide walks you through deploying your Next.js app to Vercel and configuring Cloudflare as a DNS/CDN proxy for maximum security and performance.

## Architecture Overview

```
User Request
    ↓
Cloudflare (DNS, CDN, DDoS Protection, WAF)
    ↓
Vercel (Next.js Hosting, Edge Functions)
    ↓
Supabase (Database) + Render (Backend API)
```

**Benefits:**
- ✅ Cloudflare: DDoS protection, WAF, global CDN, bot management
- ✅ Vercel: Native Next.js support, zero configuration, edge functions
- ✅ No code changes required
- ✅ Both free tiers are sufficient for most use cases

---

## Step 1: Deploy to Vercel

### 1.1 Prepare Your Repository

1. **Push your code to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Verify environment variables** - Make sure you have:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `BACKEND_URL` (your Render backend URL)

### 1.2 Deploy on Vercel

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Sign in with GitHub

2. **Import Your Project**
   - Click "Add New..." → "Project"
   - Select your `thuh.cool` repository
   - Click "Import"

3. **Configure Project Settings**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (root)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

4. **Add Environment Variables**
   Click "Environment Variables" and add:

   | Variable | Value | Environment |
   |----------|-------|-------------|
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://xxx.supabase.co` | Production, Preview, Development |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key | Production, Preview, Development |
   | `BACKEND_URL` | `https://xxx.onrender.com` | Production, Preview, Development |

   > **Note**: Add to all environments (Production, Preview, Development) for consistency

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Note your Vercel URL: `https://thuh-cool.vercel.app`

6. **Verify Deployment**
   - Visit your Vercel URL
   - Test all pages: home, writing, guestbook, admin login
   - Check that API routes work

---

## Step 2: Configure Custom Domain on Vercel

1. **Add Domain in Vercel**
   - Go to your project → "Settings" → "Domains"
   - Click "Add Domain"
   - Enter: `thuh.cool`
   - Click "Add"
   - Also add: `www.thuh.cool`

2. **Get DNS Instructions**
   - Vercel will show DNS records to add
   - You'll see something like:
     ```
     Type: A
     Name: @
     Value: 76.76.21.21
     
     Type: CNAME
     Name: www
     Value: cname.vercel-dns.com
     ```
   - **Don't add these yet** - we'll configure via Cloudflare instead

---

## Step 3: Set Up Cloudflare

### 3.1 Add Domain to Cloudflare

1. **Sign Up/Login to Cloudflare**
   - Visit: https://dash.cloudflare.com
   - Sign up or log in (free account is sufficient)

2. **Add Your Site**
   - Click "Add a Site"
   - Enter: `thuh.cool`
   - Click "Add site"
   - Select "Free" plan (click "Continue with Free")

3. **Cloudflare Scans Your DNS**
   - Cloudflare will automatically detect your existing DNS records
   - Review the records (you can import them)
   - Click "Continue"

4. **Update Nameservers**
   - Cloudflare will provide 2 nameservers, e.g.:
     ```
     alice.ns.cloudflare.com
     bob.ns.cloudflare.com
     ```
   - **Go to your domain registrar** (where you bought thuh.cool)
   - Update nameservers to Cloudflare's nameservers
   - Wait 5-30 minutes for DNS propagation

### 3.2 Configure DNS Records

1. **Go to DNS Settings**
   - In Cloudflare dashboard → Your site → "DNS" → "Records"

2. **Add/Update Records for Vercel**
   
   **Option A: Using CNAME (Recommended)**
   - Delete any existing A records for `@` (root domain)
   - Add CNAME record:
     - **Type**: CNAME
     - **Name**: `@`
     - **Target**: `cname.vercel-dns.com` (or Vercel's provided CNAME)
     - **Proxy status**: 🟠 Proxied (orange cloud) ← **IMPORTANT**
     - **TTL**: Auto
     - Click "Save"
   
   - Add CNAME for www:
     - **Type**: CNAME
     - **Name**: `www`
     - **Target**: `cname.vercel-dns.com`
     - **Proxy status**: 🟠 Proxied
     - **TTL**: Auto
     - Click "Save"

   **Option B: Using A Records (If CNAME not supported)**
   - Add A record:
     - **Type**: A
     - **Name**: `@`
     - **IPv4 address**: `76.76.21.21` (Vercel's IP - check Vercel dashboard)
     - **Proxy status**: 🟠 Proxied
     - **TTL**: Auto

   > **Important**: The 🟠 orange cloud (Proxied) enables Cloudflare's CDN, DDoS protection, and WAF

3. **Verify DNS**
   - Wait 5-10 minutes
   - Check DNS propagation: https://dnschecker.org
   - Search for `thuh.cool` and verify it points to Cloudflare IPs

---

## Step 4: Configure Cloudflare Settings

### 4.1 SSL/TLS Settings

1. **Go to SSL/TLS**
   - Cloudflare dashboard → Your site → "SSL/TLS"

2. **Set Encryption Mode**
   - Select: **Full (strict)**
   - This ensures end-to-end encryption between Cloudflare and Vercel

3. **Wait for Certificate**
   - Cloudflare will automatically provision SSL certificate
   - Usually takes 5-10 minutes
   - Status will show "Active Certificate"

### 4.2 Security Settings

1. **Go to Security**
   - Cloudflare dashboard → Your site → "Security"

2. **Configure WAF (Web Application Firewall)**
   - **Security Level**: Medium (or High for stricter protection)
   - **Challenge Passage**: 30 minutes
   - **Browser Integrity Check**: On

3. **Bot Fight Mode** (Free tier)
   - Enable "Bot Fight Mode" for basic bot protection
   - Or upgrade to Pro for Advanced Bot Management

### 4.3 Speed Settings

1. **Go to Speed**
   - Cloudflare dashboard → Your site → "Speed"

2. **Enable Optimizations**
   - **Auto Minify**: Enable for HTML, CSS, JavaScript
   - **Brotli**: Enable
   - **Early Hints**: Enable (if available)

### 4.4 Caching Settings

1. **Go to Caching**
   - Cloudflare dashboard → Your site → "Caching"

2. **Caching Level**
   - Set to: **Standard**

3. **Browser Cache TTL**
   - Set to: **4 hours** (or "Respect Existing Headers" if Vercel sets cache headers)

4. **Purge Cache** (when needed)
   - After deploying updates, you may need to purge Cloudflare cache
   - Go to "Caching" → "Configuration" → "Purge Everything"

---

## Step 5: Verify Vercel Domain Configuration

1. **Go Back to Vercel**
   - Project → "Settings" → "Domains"

2. **Verify Domain**
   - Vercel should detect Cloudflare as DNS provider
   - Status should show "Valid Configuration"
   - If not, wait a few more minutes for DNS propagation

3. **Test Domain**
   - Visit: `https://thuh.cool`
   - Visit: `https://www.thuh.cool`
   - Both should load your site

---

## Step 6: Update Supabase Redirect URLs

1. **Go to Supabase Dashboard**
   - Authentication → "URL Configuration"

2. **Update Site URL**
   - Set to: `https://thuh.cool`

3. **Add Redirect URLs**
   ```
   https://thuh.cool/auth/callback
   https://www.thuh.cool/auth/callback
   https://thuh.cool/admin
   https://www.thuh.cool/admin
   ```

---

## Step 7: Update Google OAuth Settings

1. **Go to Google Cloud Console**
   - APIs & Services → "Credentials"
   - Edit your OAuth 2.0 Client ID

2. **Update Authorized JavaScript Origins**
   ```
   https://thuh.cool
   https://www.thuh.cool
   ```

3. **Update Authorized Redirect URIs**
   ```
   https://<your-supabase-ref>.supabase.co/auth/v1/callback
   ```

---

## Step 8: Test Everything

### 8.1 Basic Functionality
- [ ] Homepage loads: `https://thuh.cool`
- [ ] Writing page works: `https://thuh.cool/writing`
- [ ] Guestbook works: `https://thuh.cool/guestbook`
- [ ] About page works: `https://thuh.cool/about`

### 8.2 API Routes
- [ ] Guestbook API: Submit a test message
- [ ] Newsletter API: Test subscription
- [ ] Admin API: Test login

### 8.3 Admin Interface
- [ ] Admin login: `https://thuh.cool/admin/login`
- [ ] Google OAuth works
- [ ] Email login works
- [ ] Can create/edit posts

### 8.4 Security
- [ ] SSL certificate is active (green lock in browser)
- [ ] HTTPS redirects work
- [ ] Cloudflare WAF is active (check response headers)

### 8.5 Performance
- [ ] Pages load quickly
- [ ] Images are optimized
- [ ] CDN is working (check response headers for `cf-cache-status`)

---

## Troubleshooting

### Domain Not Resolving

**Problem**: `thuh.cool` shows "This site can't be reached"

**Solutions**:
1. Wait 30-60 minutes for DNS propagation
2. Check DNS records in Cloudflare dashboard
3. Verify nameservers are updated at your registrar
4. Use `dig thuh.cool` or `nslookup thuh.cool` to check DNS

### SSL Certificate Issues

**Problem**: "Not Secure" or SSL errors

**Solutions**:
1. Ensure SSL/TLS mode is "Full (strict)" in Cloudflare
2. Wait 10-15 minutes for certificate provisioning
3. Check Vercel domain configuration
4. Clear browser cache

### Cloudflare 502/520/521 Errors

**Problem**: Cloudflare shows error pages

**Solutions**:
1. Check Vercel deployment is successful
2. Verify Vercel domain is properly configured
3. Check SSL/TLS mode is "Full (strict)"
4. Disable Cloudflare proxy temporarily to test direct Vercel access

### API Routes Not Working

**Problem**: API calls fail or timeout

**Solutions**:
1. Check environment variables in Vercel
2. Verify `BACKEND_URL` is correct
3. Check CORS settings in Render backend
4. Review Vercel function logs

### Cache Issues

**Problem**: Changes not showing up

**Solutions**:
1. Purge Cloudflare cache: Caching → Purge Everything
2. Check Vercel deployment is latest
3. Hard refresh browser (Ctrl+Shift+R / Cmd+Shift+R)
4. Check cache headers in Vercel

---

## Monitoring & Maintenance

### Regular Checks

1. **Vercel Dashboard**
   - Monitor deployments
   - Check function logs
   - Review analytics

2. **Cloudflare Dashboard**
   - Check security events
   - Monitor bandwidth usage
   - Review analytics

3. **Supabase Dashboard**
   - Monitor database usage
   - Check API usage
   - Review auth logs

### Performance Optimization

1. **Enable Cloudflare Argo** (paid, optional)
   - Faster global routing
   - Better performance for international users

2. **Vercel Analytics** (optional)
   - Track page views
   - Monitor Core Web Vitals
   - Identify performance bottlenecks

3. **Image Optimization**
   - Use Next.js Image component (already done)
   - Consider Cloudflare Images (paid) for advanced optimization

---

## Cost Breakdown

| Service | Free Tier | What You Get |
|---------|-----------|--------------|
| **Vercel** | Free | 100GB bandwidth, unlimited builds, edge functions |
| **Cloudflare** | Free | Unlimited requests, DDoS protection, WAF, CDN |
| **Supabase** | Free | 500MB database, 2GB bandwidth, 50K monthly active users |
| **Render** | Free | 750 hours/month, 512MB RAM |

**Total Monthly Cost**: $0 (for most personal sites)

---

## Security Checklist

- [x] Cloudflare WAF enabled
- [x] SSL/TLS Full (strict) mode
- [x] DDoS protection active
- [x] Bot Fight Mode enabled
- [x] Security headers configured (via Vercel)
- [x] Environment variables secured
- [x] Supabase RLS policies in place
- [x] Admin routes protected with middleware

---

## Next Steps

1. ✅ Deploy to Vercel
2. ✅ Configure Cloudflare
3. ✅ Test all functionality
4. ✅ Monitor performance
5. ✅ Set up monitoring/alerts (optional)

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Cloudflare Documentation](https://developers.cloudflare.com/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Cloudflare + Vercel Best Practices](https://vercel.com/docs/concepts/edge-network/cloudflare)

---

**Congratulations!** Your site is now deployed with enterprise-grade security and performance. 🚀

