# Backend and deployment notes

## Release assessment — 19 September 2026

The dependency advisory blocker is resolved. A fresh full `npm audit` reports **0 vulnerabilities**, including development dependencies. Sanity was upgraded from v4 to **6.15.0**, and next-sanity from v11 to **13.3.4**. Node 24 and Next.js 16 satisfy their requirements. React and React DOM are both pinned to 19.2.4 to prevent mismatched renderer versions during dependency resolution.

Four scoped overrides in `package.json` address vulnerable transitive versions still pinned by Sanity CLI dependencies:

| Parent package | Patched dependency |
| --- | --- |
| `@module-federation/dts-plugin` | `adm-zip` 0.6.1 |
| `@vercel/frameworks` | `js-yaml` 3.15.2 and `smol-toml` 1.8.0 |
| `typeid-js` | `uuid` 11.1.1 |

The UUID override stays on the CommonJS-compatible v11 line. Tests exercise TypeID generation/round trips, YAML/TOML parsing, and ZIP creation/reading through the actual parent dependency resolution. Revisit these overrides when upstream packages adopt patched versions; do not remove them without rerunning the audit and tests.

Verification: production build, ESLint, Studio schema extraction, and all seven tests passed. The build generated the existing seven blog pages. The upgrade does not migrate hosted content or change project permissions. Authenticated editing/publishing still needs a check with your own Sanity account on the updated preview before production promotion. Your earlier preview approval covered the version before this dependency upgrade.

Migration references: [Sanity v4 to v5](https://www.sanity.io/docs/help/v4-to-v5), [v5 to v6](https://www.sanity.io/docs/help/v5-to-v6), and [next-sanity migration guides](https://github.com/sanity-io/next-sanity). This project does not use the custom auth-provider or SanityLive APIs affected by the breaking changes. Sanity v6 changes the default Studio search strategy; the website's content queries remain unchanged.

A clean audit addresses known package advisories at the time of the check, not a guarantee against every application vulnerability. Re-run `npm audit` before release.

## What the backend does now

The application reads published articles and projects directly from the existing Sanity project (`w7bwp0ru`, `production`). Next.js caches these reads for 60 seconds and regenerates pages on visits. The optional signed Sanity webhook can invalidate that cache sooner.

| Area | Previous implementation | Current implementation |
| --- | --- | --- |
| Content | Sanity `blog` documents | Sanity `blog` and starter `post` documents, with existing URLs preserved |
| Cache | Redis for the old comments API | Next.js content/page cache; Redis client and connection code removed |
| Database | Mongoose models for comments and contact submissions | Models and database connection removed; no MongoDB connection |
| Visitor login | NextAuth with Google/GitHub providers | Removed; the public portfolio needs no visitor account |
| Publishing login | Separate/incomplete Studio setup | Sanity authenticates editors and enforces project permissions at `/studio` |
| Contact | MongoDB storage plus Airtable and email forwarding | Direct `mailto:` contact; the app does not store submissions |
| Comments | MongoDB storage and Redis cache | Removed from the public site and API; readers can reply by email |
| Projects | Client request through `/api/projects` | Server-side Sanity read; redundant API route removed |
| Refresh | Unauthenticated GET cache reset | Signed POST `/api/revalidate`, disabled unless its secret is configured |

The first redesign disconnected the old backend from the UI but retained its routes. This cleanup removes those routes and packages. The old comments API had no server-side authorization check on writes/deletes; removing it also removes that exposed entry point.

No hosted databases, Redis keys, Sanity documents, external accounts, or credentials were deleted or changed. Old MongoDB contact/comment records still exist wherever you hosted them, but this site no longer displays them. Do not delete shared services unless you have separately confirmed nothing else uses them.

## Environment variables

The site uses only:

- `NEXT_PUBLIC_SANITY_PROJECT_ID` — defaults to `w7bwp0ru`.
- `NEXT_PUBLIC_SANITY_DATASET` — defaults to `production`.
- `NEXT_PUBLIC_BASE_URL` — the deployed origin, without a trailing slash.
- `SANITY_REVALIDATE_SECRET` — optional, server-only signing secret for the publish webhook.

`MONGO_URI`, `MONGODB_URI`, `REDIS_URL`, `GOOGLE_ID`, `GOOGLE_SECRET`, `GITHUB_ID`, `GITHUB_SECRET`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `AIRTABLE_URL`, `API_ACCESS_TOKEN`, `EMAILENDPOINT`, and `SANITY_API_TOKEN` are no longer read by this application. They can be removed from this deployment's environment after rollout. Local `.env.local` has deliberately been left untouched. Sanity Studio login uses Sanity's own authentication, not these former NextAuth OAuth credentials.

## Deployment settings

- Use Node.js **24.x**, matching `package.json` and `.nvmrc`. [Vercel supports Node 24](https://vercel.com/changelog/node-js-24-lts-is-now-generally-available-for-builds-and-functions).
- Set the project root to this repository, build command to `npm run build`, and installation command to `npm ci` (no legacy peer flag).
- Set `NEXT_PUBLIC_BASE_URL` to the real production URL. The sitemap and robots file share that origin.
- In Sanity Manage → API → CORS origins, allow that exact origin with credentials for Studio login. Add preview origins individually if you need to use Studio on preview deployments.
- Optionally configure the [signed webhook](sanity-webhook.md). Without it, normal 60-second regeneration still works.
- Review a preview deployment before promoting it. Account login and a real publish action require your Sanity account and have not been exercised by publishing test content to production.

## Local cleanup recovery

Obsolete files were moved to the Git-ignored `artifacts/cleanup-backup/`, preserving their relative paths. The untracked duplicate `personalblogsite` Studio is included there. They are outside the active source tree and are not intended for deployment. `artifacts/cleanup-import-audit.json` records the retained entrypoints and unused-code trace. Do not force-add the recovery directory to Git.
