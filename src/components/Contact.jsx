export default function Contact() {
  return (
    <section
      id="contact"
      className="contact-section"
      aria-labelledby="contact-title"
    >
      <div className="container contact-inner">
        <p className="eyebrow">04 / START A CONVERSATION</p>
        <div className="contact-heading">
          <h2 id="contact-title">
            Have something
            <br />
            in mind?
          </h2>
          <a
            className="contact-arrow"
            href="mailto:ram706860@gmail.com"
            aria-label="Email Ramkrishn Rai"
          >
            ↗
          </a>
        </div>
        <div className="contact-bottom">
          <p>
            A project, an idea, or just a hello.
            <br />
            I’d love to hear from you.
          </p>
          <a href="mailto:ram706860@gmail.com">
            ram706860@gmail.com <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
