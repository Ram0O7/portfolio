# Optional: refresh immediately after publishing

The portfolio already revalidates published content every 60 seconds on visits. This optional signed webhook invalidates the content cache on a publish/unpublish/delete, so the next visit reads fresh content.

1. Generate a long random secret and save it as `SANITY_REVALIDATE_SECRET` in the deployed app's environment. Redeploy once to load the variable.
2. Open [Sanity Manage](https://www.sanity.io/manage/project/w7bwp0ru), then **API → Webhooks → Create webhook**.
3. Use `https://YOUR-PORTFOLIO-DOMAIN/api/revalidate` as the URL.
4. Choose the `production` dataset; enable **Create**, **Update**, and **Delete**.
5. Use this filter:
   ```groq
   _type in ["blog", "post", "project", "author", "category"] && !(_id in path("drafts.**"))
   ```
6. Use this projection:
   ```groq
   {_type}
   ```
7. Use **POST**, leave draft events disabled, and put the same secret in Sanity's **Secret** field. This is a webhook signing secret, not an API token.
8. Enable the webhook.

The endpoint validates the signature using `next-sanity/webhook`, expires the shared content tag, and invalidates the homepage, blog list, all article pages (including previous slugs), and sitemap. Unsupported document types receive 400; invalid signatures receive 401; missing server configuration receives 503. The old unauthenticated GET endpoint is intentionally no longer supported.

Verify delivery in Sanity's webhook logs after a real authorized content update. A successful response is `{"revalidated":true}`. Do not publish disposable content to the production dataset for testing.

See [Sanity's signature-validation guide](https://www.sanity.io/docs/nextjs/validating-sanity-webhooks-nextjs) and [Next.js revalidateTag](https://nextjs.org/docs/app/api-reference/functions/revalidateTag).
