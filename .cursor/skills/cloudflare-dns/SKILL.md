---
name: cloudflare-dns
description: Connect cursornewzealand.co.nz on Cloudflare DNS to the Vercel deployment. Use when configuring DNS, SSL, apex/www redirects, verifying domain propagation, or troubleshooting custom domain issues.
---

# Cloudflare DNS for Cursor New Zealand

Production domain: **https://cursornewzealand.co.nz** (also add **www**).

Hosting stays on **Vercel Hobby**. Cloudflare is DNS + optional CDN only.

## Prerequisites

- Domain registered and active in Cloudflare: `cursornewzealand.co.nz`
- Vercel project linked to `aleibovici/cursor-new-zealand`
- `NEXT_PUBLIC_SITE_URL=https://cursornewzealand.co.nz` in Vercel env vars (no trailing slash)
- **Cloudflare MCP** authenticated (OAuth on first use) or manual dashboard access
- **Vercel MCP** for adding domains and inspecting DNS requirements

## One-time setup

### 1. Add domains in Vercel

In Vercel → Project → Settings → Domains, add:

- `cursornewzealand.co.nz` (apex)
- `www.cursornewzealand.co.nz`

Set apex as primary; redirect `www` → apex (or vice versa — pick one canonical URL and match `NEXT_PUBLIC_SITE_URL`).

Use Vercel MCP or CLI to inspect required records:

```bash
vercel domains inspect cursornewzealand.co.nz
```

### 2. Cloudflare DNS records

In Cloudflare → **cursornewzealand.co.nz** → DNS → Records:

| Type  | Name  | Content                | Proxy status          |
| ----- | ----- | ---------------------- | --------------------- |
| CNAME | `@`   | `cname.vercel-dns.com` | DNS only (grey cloud) |
| CNAME | `www` | `cname.vercel-dns.com` | DNS only (grey cloud) |

Cloudflare supports CNAME flattening at the apex (`@`). If Vercel shows a project-specific CNAME target (e.g. `cname.vercel-dns-0.com`), use that instead.

Alternative for apex if CNAME flattening fails:

| Type | Name | Content       | Proxy    |
| ---- | ---- | ------------- | -------- |
| A    | `@`  | `76.76.21.21` | DNS only |

### 3. Cloudflare SSL/TLS

- **SSL/TLS** → Overview → **Full (strict)**
- Do not use Flexible SSL with Vercel

### 4. Verify

```bash
dig cursornewzealand.co.nz +short
dig www.cursornewzealand.co.nz +short
```

In Vercel, wait for domain status **Valid Configuration** and SSL **Active**.

Confirm locally after deploy:

- `https://cursornewzealand.co.nz` loads the site
- `/sitemap.xml` and Open Graph tags use `https://cursornewzealand.co.nz` (from `NEXT_PUBLIC_SITE_URL`)

## Using MCP

- **cloudflare-api** — create/update DNS records, check zone settings (OAuth)
- **cloudflare-docs** — current Cloudflare DNS/SSL docs
- **vercel** — add domain, inspect DNS requirements, check deployment

## Troubleshooting

| Symptom              | Fix                                                                              |
| -------------------- | -------------------------------------------------------------------------------- |
| Redirect loop        | Set SSL to Full (strict); disable orange-cloud proxy on Vercel CNAMEs            |
| SSL pending          | Wait 15–60 min; confirm DNS only (grey cloud) on Vercel records                  |
| Wrong OG/sitemap URL | Set `NEXT_PUBLIC_SITE_URL=https://cursornewzealand.co.nz` in Vercel and redeploy |
| 404 on apex          | Ensure apex domain added in Vercel, not just www                                 |

## Canonical URL

Always use **https://cursornewzealand.co.nz** (no trailing slash) in:

- `NEXT_PUBLIC_SITE_URL` (Vercel + `.env.local`)
- Luma, social links, and upstream README PR when listing the site
