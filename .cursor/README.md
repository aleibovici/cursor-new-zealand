# Cursor agent config (Cursor New Zealand)

Shared MCP servers, skills, and rules for this repo. Committed to git so teammates get the same agent setup.

## Quick start

1. **Reload Cursor** after clone/pull (MCP reads `.cursor/mcp.json`).
2. **Authenticate MCP** on first use:
   - **vercel** — Vercel OAuth
   - **cloudflare-api** — Cloudflare OAuth (DNS, zones)
   - **GitHub** — set `GITHUB_PERSONAL_ACCESS_TOKEN` in your environment (Docker required)
3. **Install Cloudflare plugin** (once per machine, optional but recommended):
   ```
   /add-plugin cloudflare
   ```
   Adds Cloudflare platform skills from the Cursor Marketplace.

## MCP servers (`mcp.json`)

| Server          | URL / command                             |
| --------------- | ----------------------------------------- |
| vercel          | `https://mcp.vercel.com`                  |
| cloudflare-api  | `https://mcp.cloudflare.com/mcp`          |
| cloudflare-docs | `https://docs.mcp.cloudflare.com/mcp`     |
| GitHub          | Docker `ghcr.io/github/github-mcp-server` |
| lighthouse      | `npx -y lighthouse-mcp`                   |

## Project skills

- `skills/deploy-vercel/` — Vercel Hobby deploy + env vars
- `skills/cloudflare-dns/` — `cursornewzealand.co.nz` DNS → Vercel

## Project rules

- `rules/content-first.mdc`
- `rules/typescript-react.mdc`
- `rules/vercel-deploy.mdc`
- `rules/cloudflare-dns.mdc`

See `AGENTS.md` in the repo root for the full agent guide.
