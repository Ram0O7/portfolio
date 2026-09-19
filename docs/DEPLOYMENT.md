# Backend and deployment notes

## Release assessment — 19 September 2026

The source cleanup is suitable for branch review and a preview deployment. **Do not treat this as a production security sign-off yet.** Compatible dependency updates reduced the audit findings from 32 to 9, but 4 high and 5 moderate findings remain in the Sanity dependency tree.

- High: `adm-zip`, propagated through `@sanity/runtime-cli`, `@sanity/cli`, and `sanity` (four package findings for that chain).
- Moderate: `uuid`, propagated through Sanity's UUID, preview-secret, visual-editing, and Next.js integration packages.

The high-severity path concerns CLI ZIP handling; that does not by itself demonstrate an exploitable public website endpoint. It is nevertheless unresolved. npm's proposed complete remediation changes Sanity to major version 6 and next-sanity to major version 13; those migrations require their own compatibility verification. No forced major upgrades or untested dependency overrides were applied.

References: [adm-zip advisory](https://github.com/advisories/GHSA-7q85-xj36-vmfc), [UUID advisory](https://github.com/advisories/GHSA-w5hq-g745-h8pq). Re-run `npm audit --omit=dev` before release, since advisories change.

Verification completed: fresh `npm ci` without the legacy-peer flag, production build, ESLint, four content tests, desktop/mobile visual checks, and HTTP checks. The removed auth/contact/comments/projects APIs return 404. The unconfigured refresh webhook fails closed with 503. A limited secret-pattern scan found no matches in versionable source, and `.env.local` plus recovery files are Git-ignored. npm still reports an upstream React peer warning from `use-sync-external-store`; installation and the checked pages succeed despite it.

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
