import Link from "next/link";
import Image from "next/image";
export default function Hero() {
  return (
    <section className="hero container" aria-labelledby="intro-title">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="status-dot" /> WEB DEVELOPER · KOLKATA, INDIA
        </p>
        <h1 id="intro-title">
          Thoughtful code.
          <br />
          <span>Useful experiences.</span>
        </h1>
        <p className="hero-description">
          I’m Ramkrishn — a web developer who enjoys turning complex ideas into
          simple, accessible experiences for the web.
        </p>
        <div className="hero-actions">
          <Link href="#work" className="button button-dark">
            Explore my work <span aria-hidden="true">↘</span>
          </Link>
          <Link href="/blogs" className="text-link">
            Read my writing <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
      <figure className="portrait">
        <div className="portrait-image">
          <Image
            src="https://res.cloudinary.com/dn6bzdlno/image/upload/v1696428292/profile_lgfu01.jpg"
            alt="Ramkrishn Rai"
            fill
            priority
            sizes="(max-width: 700px) 70vw, 300px"
          />
        </div>
        <figcaption>
          <span>A little curiosity. A lot of building.</span>
          <span aria-hidden="true">↙</span>
        </figcaption>
      </figure>
      <div className="hero-footnote">
        <span>DESIGN MINDED. DEVELOPMENT DRIVEN.</span>
        <a href="#work">
          SCROLL TO EXPLORE <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
