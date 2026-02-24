# Google OAuth Setup Guide

This guide will help you set up Google OAuth for admin authentication with the email `htgt52hz@gmail.com`.

## Step 1: Google Cloud Console Setup

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com
   - Sign in with `htgt52hz@gmail.com`

2. **Create or Select a Project**
   - Click on the project dropdown at the top
   - Click "New Project" or select an existing one
   - Name it "thuh.cool" or similar

3. **Enable Google+ API**
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API" or "Google Identity"
   - Click "Enable"

4. **Create OAuth 2.0 Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - If prompted, configure the OAuth consent screen first:
     - User Type: External (unless you have a Google Workspace)
     - App name: "thuh.cool Admin"
     - User support email: `htgt52hz@gmail.com`
     - Developer contact: `htgt52hz@gmail.com`
     - Click "Save and Continue" through scopes and test users
   - Application type: **Web application**
   - Name: "thuh.cool Admin OAuth"
   - **Authorized JavaScript origins:**
     ```
     https://thuh.cool
     https://www.thuh.cool
     http://localhost:3000
     ```
   - **Authorized redirect URIs:**
     ```
     https://<your-supabase-project-ref>.supabase.co/auth/v1/callback
     http://localhost:3000/auth/callback
     ```
     > Replace `<your-supabase-project-ref>` with your actual Supabase project reference ID (found in Supabase Dashboard → Settings → General)

5. **Copy Credentials**
   - After creating, you'll see a popup with:
     - **Client ID** (copy this)
     - **Client Secret** (copy this - you can only see it once!)
   - Save both securely

## Step 2: Supabase Configuration

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Select your project

2. **Configure Authentication**
   - Go to "Authentication" → "Providers"
   - Find "Google" in the list
   - Click to enable it

3. **Enter Google OAuth Credentials**
   - **Client ID (for OAuth)**: Paste the Client ID from Google Cloud Console
   - **Client Secret (for OAuth)**: Paste the Client Secret from Google Cloud Console
   - Click "Save"

4. **Configure Site URL and Redirect URLs**
   - Go to "Authentication" → "URL Configuration"
   - **Site URL**: `https://thuh.cool` (or `https://www.thuh.cool` if you prefer)
   - **Redirect URLs**: Add these:
     ```
     https://thuh.cool/auth/callback
     https://www.thuh.cool/auth/callback
     https://thuh.cool/admin
     http://localhost:3000/auth/callback
     http://localhost:3000/admin
     ```

## Step 3: Test the Setup

1. **Start your dev server** (if not already running):
   ```bash
   npm run dev
   ```

2. **Navigate to admin login**:
   - Go to: http://localhost:3000/admin/login

3. **Click "Sign in with Google"**
   - You should be redirected to Google's consent screen
   - Sign in with `htgt52hz@gmail.com`
   - Grant permissions
   - You'll be redirected back to `/admin`

## Troubleshooting

### "Redirect URI mismatch" error
- Make sure the redirect URI in Google Cloud Console exactly matches:
  `https://<your-project-ref>.supabase.co/auth/v1/callback`
- Check for typos, trailing slashes, or http vs https

### "Access blocked" error
- If you're using a test OAuth app, add `htgt52hz@gmail.com` as a test user in Google Cloud Console:
  - Go to "OAuth consent screen" → "Test users" → "Add users"

### Not redirecting after login
- Check Supabase Redirect URLs include both production and localhost URLs
- Verify Site URL is set correctly in Supabase

## Security Notes

- Never commit Client Secret to git
- Keep your OAuth credentials secure
- Use environment variables for sensitive data in production
- Consider restricting OAuth to specific email domains if needed

## Production Deployment

When deploying to production:
1. Update Google Cloud Console redirect URIs to include your production domain
2. Update Supabase Site URL to your production domain
3. Test the OAuth flow on production before going live

