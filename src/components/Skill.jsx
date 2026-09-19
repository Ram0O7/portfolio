const toolkit = [
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "Tailwind CSS",
  "MongoDB",
  "Git",
  "Sanity",
];
export default function Skill() {
  return (
    <section
      id="about"
      className="about-section container section-space"
      aria-labelledby="about-title"
    >
      <div>
        <p className="eyebrow">02 / A LITTLE ABOUT ME</p>
        <h2 id="about-title">
          Curiosity is
          <br />
          part of the process.
        </h2>
      </div>
      <div className="about-copy">
        <p>
          I’m a developer based in Kolkata, India, with a love for the details
          that make a website feel right. I work across the frontend and
          backend, bringing ideas to life with clean interfaces and practical
          code.
        </p>
        <p>
          This space is a collection of what I’ve built and what I’m learning
          along the way. Away from the editor, you’ll usually find me exploring
          science fiction or a good conversation about technology.
        </p>
        <div className="toolkit">
          <h3 className="eyebrow">MY EVERYDAY TOOLKIT</h3>
          <div className="tags">
            {toolkit.map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
