# Cursor New Zealand — agent guide

Next.js community site for Cursor events in Aotearoa New Zealand. Fork of [cursor-ambassador-evergreen](https://github.com/luisfer/cursor-ambassador-evergreen).

## Stack

- Next.js 16, React 19, TypeScript, Tailwind CSS 4
- pnpm, oxfmt, oxlint
- Deployed on **Vercel Hobby** (free)
- DNS on **Cloudflare**: **cursornewzealand.co.nz**
- Events on **Luma**: https://luma.com/cursor-new-zealand

## Production URL

```bash
NEXT_PUBLIC_SITE_URL=https://cursornewzealand.co.nz
```

Set in Vercel project env vars and local `.env.local` (no trailing slash).

## Where to change things

| Goal                          | File(s)                                         |
| ----------------------------- | ----------------------------------------------- |
| Site name, Luma URL, sections | `content/site.config.ts`                        |
| Events                        | `content/events.ts`                             |
| Ambassadors                   | `content/ambassadors.ts`                        |
| Hero photos                   | `content/header-photos.ts`                      |
| UI copy                       | `content/locales/en.json`                       |
| Production URL                | `NEXT_PUBLIC_SITE_URL` in Vercel + `.env.local` |

## Commands

```bash
pnpm dev       # local dev
pnpm verify    # format + lint + typecheck + validators + build
pnpm format    # oxfmt
```

## Git remotes

- `origin` → `aleibovici/cursor-new-zealand`
- `upstream` → `luisfer/cursor-ambassador-evergreen` (template updates)

## MCP (project — `.cursor/mcp.json`)

| Server              | Purpose                                         | Auth                               |
| ------------------- | ----------------------------------------------- | ---------------------------------- |
| **vercel**          | Deployments, logs, domains                      | OAuth (Vercel login)               |
| **cloudflare-api**  | DNS records, zone settings, full Cloudflare API | OAuth (Cloudflare login)           |
| **cloudflare-docs** | Up-to-date Cloudflare documentation             | None                               |
| **GitHub**          | PRs, repo operations                            | `GITHUB_PERSONAL_ACCESS_TOKEN` env |
| **lighthouse**      | Performance audits                              | None                               |

After pulling, reload Cursor window so MCP servers connect. Authenticate **vercel** and **cloudflare-api** on first tool use.

## Cloudflare plugin (one-time per machine)

Install the official Cloudflare plugin for extra platform skills:

```
/add-plugin cloudflare
```

Or: Cursor Marketplace → Cloudflare, or Settings → Rules → Add Rule → Remote Rule → `cloudflare/skills`.

This adds Cloudflare-wide skills (Workers, DNS, WAF, etc.) alongside the project-specific skills below.

## Project skills (`.cursor/skills/`)

| Skill              | When to use                                                        |
| ------------------ | ------------------------------------------------------------------ |
| **deploy-vercel**  | Vercel import, env vars, production deploy                         |
| **cloudflare-dns** | DNS records for cursornewzealand.co.nz → Vercel, SSL, verification |

## Project rules (`.cursor/rules/`)

- **content-first** — edit `content/` before components
- **typescript-react** — TS/React conventions
- **vercel-deploy** — Vercel Hobby + production URL
- **cloudflare-dns** — Cloudflare DNS + SSL for this domain

Not used for this project: Stitch, Clarity (keep those global-only if needed elsewhere).
