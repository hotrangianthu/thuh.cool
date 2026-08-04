# Public Policy Artifact

Public-facing research portal on rural digital inclusion in Vietnam, built with Next.js and exported as a static site.

This repository contains the website source code for essays, policy research, interactive playground pages, and prototype narratives.

## What this project includes

- App Router pages for major sections: `research`, `playgrounds`, `prototypes`, `experiments`, `field-notes`, and `voice`
- MDX-backed research content loaded from `src/content/research`
- Reusable visualization and narrative components in `src/components`
- Static export configuration for deployment to GitLab Pages

## Tech stack

- `next` (App Router)
- `react` and `typescript`
- `gray-matter` and `next-mdx-remote` for frontmatter + MDX content handling
- `chart.js` and `react-chartjs-2` for embedded data visuals

## Project structure

```text
src/
  app/                  # Route pages and layouts
  components/           # UI, layout, and data visualization components
  content/research/     # MDX research papers
  lib/                  # Content loaders and helpers
docs/
  PORTAL_STRUCTURE.html # Internal portal map/documentation
```

## Local development

### Prerequisites

- Node.js 20+ (CI uses `node:20-alpine`)
- npm

### Install dependencies

```bash
npm install
```

### Run dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build and preview

### Production build (static export)

```bash
npm run build
```

The project uses `output: "export"` in `next.config.ts`, so build output is generated in `out/`.

### Start command

```bash
npm run start
```

Note: with static export workflows, deployment uses files in `out/` rather than a long-running Node server.

## Writing research content (MDX)

Research papers live in `src/content/research/*.mdx`.

Each file should include frontmatter:

```mdx
---
title: "Paper title"
date: "2026-06-01"
abstract: "Short summary"
tags: ["Policy", "Vietnam"]
wordCount: 1200
status: "published"
---
```

Draft filtering is handled in `src/lib/mdx.ts`: posts marked with `status: "draft"` are excluded from the public listing.

## Deployment

GitLab CI is configured in `.gitlab-ci.yml`:

1. Build site with `npm ci && npm run build`
2. Copy `out/` into `public/`
3. Publish via GitLab Pages on `main`

## Scripts

- `npm run dev` - start local development server
- `npm run build` - build static site to `out/`
- `npm run start` - start production server command
- `npm run lint` - run Next.js lint checks
