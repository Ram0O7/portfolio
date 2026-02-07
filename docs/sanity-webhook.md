# Sanity Publish Webhook — Revalidate Next.js Cache

Use Sanity webhooks to notify your Next.js app to revalidate pages after content is published.

1) Webhook URL (example)

- Revalidate blog index:

  curl "https://your-site.com/api/revalidate?path=/blogs"

- Revalidate a specific blog (replace `my-blog-slug`):

  curl "https://your-site.com/api/revalidate?path=/blogs/my-blog-slug"

2) Sanity webhook setup

- In the Sanity Studio dashboard, go to Settings → API → Webhooks → Create webhook.
- Set the trigger to `Create`, `Update`, and `Delete` for the `post` type (or your blog document type).
- Use the Webhook URL from step (1). Example: `https://your-site.com/api/revalidate?path=/blogs`.

3) Recommended: secure the webhook

- Add a secret query parameter and validate it in your revalidate route.
- Example URL: `https://your-site.com/api/revalidate?path=/blogs&secret=MY_SECRET_SECRET`

- Example server-side check (pseudo):

```js
// inside /api/revalidate route
const secret = request.nextUrl.searchParams.get('secret');
if (secret !== process.env.REVALIDATE_SECRET) return Response.json({ revalidated: false }, { status: 401 });
```

4) Sanity webhook payload handling

- Sanity sends a POST by default. You can configure the webhook to call the GET URL with query params, or set the webhook to call a small endpoint that transforms the POST into a GET call to `/api/revalidate`.

5) Test locally (if exposed)

- Use `ngrok` or similar to expose a local dev server, then trigger the webhook from Sanity.

6) Example curl POST (Sanity -> revalidate helper)

- If you want to accept POST from Sanity and revalidate a path included in the JSON payload, create a small serverless handler that extracts the slug and calls the revalidate route internally.

```bash
curl -X POST 'https://your-site.com/api/revalidate?path=/blogs/my-blog-slug'
```

Notes

- Your Next.js app must be deployed (or reachable) for Sanity to call the webhook.
- Consider adding retry / idempotency handling if your site receives many webhook calls.
