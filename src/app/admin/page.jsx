import Link from "next/link";
import { projectId } from "@/sanity/env";
export const metadata = {
  title: "Writing desk",
  robots: { index: false, follow: false },
};
export default function AdminPage() {
  return (
    <div className="container author-page">
      <div className="page-intro">
        <p className="eyebrow">YOUR WRITING DESK</p>
        <h1>A thought to share?</h1>
        <p>
          Write, edit, and publish in one place. Your articles update
          automatically on the website after you publish.
        </p>
      </div>
      <div className="author-actions">
        <Link href="/studio" className="button button-dark">
          Open Sanity Studio ↗
        </Link>
        <a
          href={"https://www.sanity.io/manage/project/" + projectId}
          className="button button-outline"
          target="_blank"
          rel="noreferrer"
        >
          Manage Sanity account ↗
        </a>
      </div>
      <div className="guide-grid">
        <section className="guide-card">
          <h2>Publish something new.</h2>
          <ol>
            <li>
              <strong>Sign in to Studio</strong> using the same Google, GitHub,
              or email account you originally used for Sanity.
            </li>
            <li>
              Open <strong>Blog articles</strong> and click the create button.
            </li>
            <li>
              Add a title, generate the URL slug, write a short summary, and add
              your content. A cover image and tags are optional.
            </li>
            <li>
              Click <strong>Publish</strong>. Your draft stays private until you
              do.
            </li>
          </ol>
        </section>
        <section className="guide-card">
          <h2>Keep it up to date.</h2>
          <ol>
            <li>
              Open <strong>Blog articles</strong> and select an existing
              article. Imported starter posts are under{" "}
              <strong>Other posts</strong>.
            </li>
            <li>
              Edit the text, images, or code blocks. Studio saves your draft as
              you work.
            </li>
            <li>
              Click <strong>Publish</strong> again to make your changes public.
            </li>
            <li>
              Use <strong>View published article</strong> in the document
              actions menu to open the article on your site.
            </li>
          </ol>
        </section>
      </div>
      <div className="guide-note">
        <strong>Good to know</strong>
        <p>
          The website checks for new content every 60 seconds when visited.
          After publishing, allow a minute and reload; the first request can
          serve the previous version while it refreshes. There’s no rebuild or
          code edit needed. Keep an existing slug unchanged to preserve links to
          your article.
        </p>
      </div>
      <div className="guide-note">
        <strong>Can’t sign in?</strong>
        <p>
          Open{" "}
          <a
            href="https://www.sanity.io/manage"
            target="_blank"
            rel="noreferrer"
          >
            Sanity Manage
          </a>{" "}
          and use your original sign-in provider. If the project is missing, try
          your other original account or ask a project administrator for an
          invitation. For a CORS error, add this site’s exact origin under your
          project’s API → CORS origins, with credentials allowed. Publishing is
          protected by Sanity’s own account permissions.
        </p>
      </div>
    </div>
  );
}
