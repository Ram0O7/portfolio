"use client";
export default function Error({ reset }) {
  return (
    <div className="container utility-page">
      <p className="eyebrow">A SMALL INTERRUPTION</p>
      <h2>Let’s try that again.</h2>
      <p>
        We couldn’t load this content. Please check your connection and try
        again.
      </p>
      <button onClick={reset} className="button button-dark">
        Try again ↗
      </button>
    </div>
  );
}
