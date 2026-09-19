# Your Sanity publishing guide

## Sign in again

1. Start the portfolio with `npm run dev`.
2. Open [your local Studio](http://localhost:3000/studio), or visit `/studio` on the deployed portfolio after deploying this update.
3. Choose the **same Google, GitHub, or email sign-in method** used when you originally created or joined the Sanity project. Your old website visitor login is separate from Sanity.
4. To check your account and project membership, open [Sanity Manage](https://www.sanity.io/manage) and select project **w7bwp0ru**, dataset **production**. The [direct project link](https://www.sanity.io/manage/project/w7bwp0ru) is also available from the writing desk.

If the project is missing, sign out and try the original provider/account, or have an existing project administrator invite the correct account. Creating a new project would not restore access to your existing content.

If you need to authenticate the CLI too, run `npm run sanity:login`. Browser Studio login is sufficient for writing; CLI login is optional.

### If Studio reports a CORS error

In Sanity Manage → your project → **API → CORS origins**, add:

- `http://localhost:3000` for local writing (use the actual port if different).
- Your exact deployed portfolio origin, such as `https://ramkrishnrai.vercel.app`.

Enable **Allow credentials**. Enter only the origin, without `/studio`. Avoid broad wildcard origins. See [Sanity's CORS documentation](https://www.sanity.io/docs/content-lake/cors).

## Add a new blog

1. In Studio, open **Blog articles** and select the create button.
2. Enter **Title**.
3. Under **Article URL**, click **Generate**. This becomes `/blogs/your-slug`.
4. Add a short **Summary**.
5. Optionally upload a **Cover image** and describe it in **Alternative text**.
6. Write in **Article**. The editor supports headings, bold, italic, links, quotes, numbered/bullet lists, inline code, images, and code blocks.
7. Use **Details** for topic tags and the display date. The display date is a label, not a publishing schedule.
8. Click **Publish** when ready. Drafts save automatically, but are not visible on the public site.
9. Use the document action **View published article** to open it on your portfolio.

The site checks for changes every 60 seconds when visited. Wait about a minute, then refresh. The first visit after cache expiry can show the old version while it refreshes in the background; a subsequent reload shows the new version. No Git commit, deployment, or manual cache reset is needed for ordinary content updates.

## Update an existing blog

1. Open **Blog articles** and select the article.
2. Edit the title, text, images, or topics.
3. Keep the existing URL slug unchanged unless you deliberately want a new URL. Changing it breaks old links unless you also add a redirect.
4. Click **Publish** to release your changes. **View published article** opens the currently published slug, not an unpublished change.

**Other posts** preserves compatibility with the newer starter schema. These posts also appear in the website's writing list when published. Use **Blog articles** for your usual workflow; there is no need to move existing articles.

## Prepare future articles

Create drafts whenever an idea arrives. Return to the draft, finish it, and click Publish when ready. Setting a future display date does **not** delay publication. This project does not configure scheduled publishing.

## Update projects

Open **Projects** to change names, descriptions, technology tags, live/source links, or screenshots. The optional **Featured project** flag puts a project first; **Display order** sorts within its group. The homepage initially shows four projects and has a button to reveal the rest.

Existing screenshot URLs are preserved. An uploaded Screenshot takes precedence over the old URL.

## Publishing permissions and optional faster refresh

Sanity enforces who can edit and publish; the writing guide at `/admin` contains no private account data. You do not need to paste an API key into the frontend.

The built-in 60-second refresh works without a webhook. For immediate invalidation after publishing, see [the signed webhook setup](sanity-webhook.md).

Reference: [Embedding Studio](https://www.sanity.io/docs/studio/embedding-sanity-studio), [Sanity account/project management](https://www.sanity.io/manage).
