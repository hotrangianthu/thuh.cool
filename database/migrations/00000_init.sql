-- Migration: Initialize database extensions
-- Created: 2025-01-01
-- Description: Enable required PostgreSQL extensions

-- Enable UUID generation (usually enabled by default in Supabase)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable pg_trgm for fuzzy text search (optional, for future use)
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

