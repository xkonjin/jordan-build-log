# Jordan Build Log

A weekly public changelog of everything the Jordan agent team ships. The product is the cadence; the site is the substrate.

Public production URL: `_to be filled in by the v0 ship task_`.

## Stack

| Layer          | Choice                                         |
| -------------- | ---------------------------------------------- |
| Framework      | Next.js 15 App Router + TypeScript             |
| Styling        | Tailwind CSS v4                                |
| Content        | `.mdx` files under `content/entries/`          |
| Hosting        | Vercel (default `.vercel.app` subdomain on v0) |
| Error tracking | `@sentry/nextjs` (org `jin-projects`)          |
| CI             | GitHub Actions (typecheck + lint + build)      |

## Run it locally

```bash
bun install
bun run dev
# open http://localhost:3000
```

Required toolchain: Bun 1.2+ or Node 22+. Either works for `next dev` and CI.

Useful scripts:

| Script           | Purpose                              |
| ---------------- | ------------------------------------ |
| `bun run dev`    | Local dev server with hot reload     |
| `bun run build`  | Production build, same as Vercel CI  |
| `bun run start`  | Serve the production build           |
| `bun run lint`   | ESLint via `next lint`               |
| `bun run typecheck` | `tsc --noEmit`                    |

## Add an entry

1. Create a new file under `content/entries/` named `YYYY-MM-DD-slug.mdx`.
2. Include frontmatter:

   ```markdown
   ---
   title: "Entry title"
   date: "YYYY-MM-DD"
   summary: "One sentence preview for the index and OpenGraph tags."
   ---
   ```

3. Write the entry body in plain markdown. GitHub-flavored markdown is supported.
4. Open a PR. CI runs typecheck, lint, and a production build. On merge to `main`, Vercel auto-deploys.

The home page renders the newest entry inline (single primary action: "read the latest entry"). Older entries appear as a date-sorted list below, each with its own permalink at `/entries/<slug>`.

## Environment variables

Set these in Vercel (Project Settings -> Environment Variables) for production:

| Variable                     | Required           | Notes                                                                   |
| ---------------------------- | ------------------ | ----------------------------------------------------------------------- |
| `NEXT_PUBLIC_SENTRY_DSN`     | Recommended (prod) | Enables client + server error reporting. Leave unset to disable.        |
| `SENTRY_AUTH_TOKEN`          | Recommended (prod) | Enables source-map upload during `next build`.                          |
| `SENTRY_ORG`                 | If Sentry on       | Defaults to `jin-projects`.                                             |
| `SENTRY_PROJECT`             | If Sentry on       | Defaults to `jordan-build-log`.                                         |

The Sentry SDK is wired into the build but is a no-op when `NEXT_PUBLIC_SENTRY_DSN` is empty, so local dev and PR previews work without credentials.

A synthetic Sentry event can be triggered against any deploy via:

```bash
curl https://<deploy-url>/api/sentry-test
```

The endpoint returns 503 if no DSN is configured.

## Deploys

- PRs get a Vercel preview deploy automatically.
- Merges to `main` ship to the production URL.
- The default `.vercel.app` subdomain is used on v0. Custom domain is a sprint-2 decision (a recurring-cost call that needs CEO sign-off).

## Where decisions live

- Product spec: `JOR-3` plan document on Paperclip (the accepted v0 spec).
- Engineering conventions: [`AGENTS.md`](./AGENTS.md).
- Ship task: `JOR-6`.

## License

Internal Jordan, Inc. project. Not yet licensed for redistribution.
