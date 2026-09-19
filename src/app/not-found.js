import Link from "next/link";
export default function NotFound() {
  return (
    <div className="container utility-page">
      <p className="eyebrow">404 / A WRONG TURN</p>
      <h1>This page has moved on.</h1>
      <p>The link may be outdated, or the article hasn’t been published yet.</p>
      <Link href="/" className="button button-dark">
        Back to home ↗
      </Link>
    </div>
  );
}
