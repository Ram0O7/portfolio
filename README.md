# Ramkrishn Rai — portfolio & writing

A minimal portfolio built with Next.js, React, and Sanity. The homepage includes selected projects, an about section, recent writing, and direct email contact. The writing index supports search and topic filters.

## Run locally

Use Node.js 24 (the same major version used for local verification and deployment).

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Open http://localhost:3000/admin for the writing guide, or http://localhost:3000/studio to edit content.

The public Sanity project defaults to `w7bwp0ru`, dataset `production`. No API token, MongoDB, or Redis is needed for the public portfolio, writing pages, or Studio login. Copy `.env.example` to `.env.local` only if you need to override those defaults; do not overwrite existing environment settings.

The backend is Sanity plus Next.js caching. Contact opens the visitor's email app. The old MongoDB/Redis comments, stored contact submissions, Airtable/email forwarding, and NextAuth visitor login have been removed. Existing hosted data is untouched. See [backend and deployment notes](docs/DEPLOYMENT.md).

### Windows npm troubleshooting

If `npm` fails with a missing `AppData/Roaming/npm/.../npm-cli.js`, use the Node installation's CLI directly:

```powershell
node "C:/Program Files/nodejs/node_modules/npm/bin/npm-cli.js" run dev
```

The same prefix works for `ci`, `run build`, and `run lint`. This avoids changing your system-wide npm configuration.

## Write and publish

See [the publishing guide](docs/PUBLISHING.md). The footer's **Studio** link opens a friendly writing desk with the same everyday instructions.

- Existing `blog` documents appear under **Blog articles**.
- Starter-schema `post` documents remain supported under **Other posts**.
- Existing URLs and content are preserved; no migration is required.
- **Projects** lets you update screenshots, links, technologies, descriptions, and display order.
- Drafts are excluded from public queries. Publish to make changes public.
- Published content is revalidated every 60 seconds on visits. The first request after expiry may receive the previous version while regeneration completes; reload afterward.
- Newly published slugs resolve without rebuilding the website.
- For immediate cache invalidation, optionally configure [the signed publish webhook](docs/sanity-webhook.md).

## Checks

```sh
npm run lint
npm test
npm run build
npm start
```

The build reads published Sanity content and needs outbound internet access. Do not publish test documents to the production dataset just to run checks.

## Deploy

Deploy this Next.js project to your usual host. Set `NEXT_PUBLIC_BASE_URL` to the actual portfolio origin for canonical links and the sitemap. In Sanity Manage, add that exact origin under **API → CORS origins** with credentials allowed so the embedded Studio can sign in. The Studio deploys as part of the site; a separate Studio deployment is unnecessary.

The editor is the root project's `/studio` route, configured in `sanity.config.js` and `src/sanity/`. The duplicate standalone Studio has been removed from the active project.

## Content and styling

- `src/app/portfolio.css`: responsive design system, keyboard focus styles, reduced-motion support.
- `src/components/`: homepage sections, navigation, project gallery, writing list.
- `src/sanity/lib/content.js`: shared published-content queries and cache policy.
- `src/sanity/schemaTypes/`: article, project, image, and rich-text schemas.
- `src/app/admin/page.jsx`: author instructions; editing permissions are enforced by Sanity.
