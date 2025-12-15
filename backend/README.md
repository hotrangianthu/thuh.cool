# ThuH Backend API

Express.js backend service for thuh.cool, deployed on Render.

## API Endpoints

### Health
- `GET /health` - Health check endpoint

### Guestbook
- `GET /api/guestbook` - Fetch all guestbook messages
- `POST /api/guestbook` - Create a new message
  - Body: `{ "name": "string", "message": "string" }`

### Newsletter
- `POST /api/newsletter` - Subscribe to newsletter
  - Body: `{ "email": "string" }`
- `POST /api/newsletter/unsubscribe` - Unsubscribe
  - Body: `{ "email": "string" }`

## Local Development

```bash
cd backend
npm install
cp env.example .env
# Edit .env with your Supabase credentials
npm run dev
```

Server runs on http://localhost:3001

## Deployment on Render

### Option 1: Using render.yaml (Blueprint)

1. Push code to GitHub
2. In Render dashboard, click "New" → "Blueprint"
3. Connect your repository
4. Render will detect `render.yaml` and configure automatically
5. Add environment variables in Render dashboard:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`

### Option 2: Manual Setup

1. Create new "Web Service" in Render
2. Connect GitHub repository
3. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Health Check Path**: `/health`
4. Add environment variables

## Environment Variables

| Variable | Description |
|----------|-------------|
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (NOT anon key) |
| `PORT` | Server port (default: 3001, Render sets automatically) |
| `CORS_ORIGIN` | Allowed origins, comma-separated |

## Security Features

- Helmet.js for security headers
- Rate limiting (100 requests per 15 minutes)
- CORS whitelist
- Input validation with Zod
- Request body size limit (10kb)

