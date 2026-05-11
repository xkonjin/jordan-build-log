# AGENTS.md

Operating guide for agent contributors to `jordan-build-log`.

## Scope

This repo is the Jordan Build Log: a public weekly changelog. Treat it as a content site, not a product. Most work is adding entries, not changing the chrome.

## Stack and conventions

- Next.js App Router (no Pages Router). Server Components by default.
- TypeScript strict mode. No `any` unless justified in a comment.
- Tailwind CSS v4 via `@import "tailwindcss"`. Theme tokens live in `app/globals.css` under `@theme inline`.
- Content lives in `content/entries/*.mdx` and is the canonical publish surface. Do NOT introduce a CMS or DB without explicit CEO approval.
- Source-of-truth file layout:

  ```
  app/                Next.js App Router routes
  app/api/            Route handlers (synthetic Sentry test lives here)
  app/entries/[slug]/ Per-entry permalinks
  content/entries/    .mdx entries, dated YYYY-MM-DD-<slug>.mdx
  lib/                Pure helpers (entry index + markdown parsing)
  sentry.*.config.ts  Sentry init for client / server / edge runtimes
  ```

## How to add an entry

1. `content/entries/YYYY-MM-DD-<slug>.mdx`.
2. Frontmatter requires `title` and `date`. `summary` is optional but recommended.
3. Markdown body. GitHub-flavored markdown is enabled.
4. PR -> Vercel preview -> CI green -> merge to `main` -> production deploy.

## How to change the chrome (layout, type, palette)

The visual system is intentionally restrained. Before changing it:

- The single primary user action is "read the latest entry in under 30 seconds." Every chrome change must respect that.
- If a change is bigger than a token tweak in `app/globals.css`, open it as its own task on Paperclip.
- Avoid imports of third-party UI kits unless there is a one-line reason in the PR description.

## CI gates

GitHub Actions runs on every PR and on `main`:

1. `bun run typecheck` (`tsc --noEmit`)
2. `bun run lint` (`next lint`)
3. `bun run build`

A red CI is a stop-the-line event. Fix or revert before merging.

## Sentry

- Production deploys should have `NEXT_PUBLIC_SENTRY_DSN` and `SENTRY_AUTH_TOKEN` set in Vercel.
- Local dev intentionally runs without Sentry. Init is a no-op when DSN is empty.
- Trigger a synthetic event with `curl https://<host>/api/sentry-test`.

## Things that are explicitly out of scope

- Subscribe / RSS / newsletter integrations.
- Comment threads or reactions.
- Auth, accounts, dashboards.
- Custom domain configuration (recurring-cost decision, escalate to CEO).
- Analytics beyond Vercel's built-in free tier.

When in doubt: ship the smallest thing that makes the entry readable, and leave the rest for an entry of its own.

## Secrets handling

- Never commit `.env`, tokens, or DSNs.
- Use Vercel's environment variable UI (Project Settings -> Environment Variables) for prod and preview secrets.
- Local secrets live in `.env.local` (gitignored).
