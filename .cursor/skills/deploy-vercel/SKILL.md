---
name: deploy-vercel
description: Deploy Cursor New Zealand to Vercel Hobby (free) with Cloudflare DNS at cursornewzealand.co.nz. Use when setting up Vercel, configuring env vars, connecting GitHub, debugging failed builds, or going to production.
---

# Deploy Cursor New Zealand on Vercel

## Production

- **Domain:** https://cursornewzealand.co.nz (Cloudflare DNS → Vercel)
- **Repo:** `aleibovici/cursor-new-zealand`
- **Env:** `NEXT_PUBLIC_SITE_URL=https://cursornewzealand.co.nz`

## Prerequisites

- GitHub repo: `aleibovici/cursor-new-zealand`
- Vercel account (Hobby / free tier is sufficient)
- Domain `cursornewzealand.co.nz` in Cloudflare
- `pnpm verify` passes locally

## First-time setup

1. Import `aleibovici/cursor-new-zealand` in [Vercel Dashboard](https://vercel.com/new).
2. Framework preset: **Next.js** (auto-detected).
3. Build command: `pnpm verify` is CI-only; Vercel runs `pnpm build` by default.
4. Install command: `pnpm install` (Vercel detects pnpm from `packageManager` in `package.json`).
5. Add environment variable:
   - `NEXT_PUBLIC_SITE_URL` = `https://cursornewzealand.co.nz` (no trailing slash).
6. Deploy.
7. Add domains in Vercel → Settings → Domains: `cursornewzealand.co.nz` and `www.cursornewzealand.co.nz`.
8. Configure Cloudflare DNS — see `.cursor/skills/cloudflare-dns/SKILL.md`.

## After deploy

- Confirm Open Graph / sitemap use `NEXT_PUBLIC_SITE_URL`.
- Test Luma links (`site.config.ts` → `lumaUrl`).
- Run Lighthouse MCP on production URL.

## Debugging failed builds

1. Use **Vercel MCP** to fetch deployment logs.
2. Reproduce locally: `pnpm verify`.
3. Common fixes: missing env var, TypeScript error, bento validation failure.

## Free tier notes

- Hobby plan covers community traffic for this marketing site.
- No Vercel Pro features required unless you need team seats or advanced analytics.
