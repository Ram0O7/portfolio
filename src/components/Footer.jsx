import Link from "next/link";
export default function Footer() {
  return (
    <footer className="site-footer container">
      <div>
        <Link href="/" className="footer-name">
          Ramkrishn Rai.
        </Link>
        <p>Built with care. Always a work in progress.</p>
      </div>
      <div className="footer-links">
        <a href="https://github.com/Ram0O7" target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
        <a
          href="https://www.linkedin.com/in/ramkrishn-rai-b06727230/"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn ↗
        </a>
        <Link href="/admin">Studio ↗</Link>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
