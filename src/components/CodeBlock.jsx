"use client";
import { useState } from "react";
export default function CodeBlock({ value }) {
  const [message, setMessage] = useState("Copy code");
  async function copy() {
    try {
      await navigator.clipboard.writeText(value.code || "");
      setMessage("Copied");
    } catch {
      setMessage("Select code to copy");
    }
  }
  return (
    <div className="code-block">
      <div className="code-heading">
        <span>{value.filename || value.language || "Code"}</span>
        <button onClick={copy} aria-live="polite">
          {message}
        </button>
      </div>
      <pre>
        <code>{value.code}</code>
      </pre>
    </div>
  );
}
