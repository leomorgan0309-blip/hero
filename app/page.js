import Image from "next/image";

export default function Home() {
  return (
    <main className="landing">
      <section className="hero">
        <div className="hero-copy-column">
          <h1 className="hero-headline">
            Design and create <span>website</span>
            <br />
            with us now!
          </h1>

          <div className="content">
            <p>
              We craft stunning websites with purpose - combining design and
              development to deliver seamless, responsive, and brand-driven
              experiences, whether launching something new or revamping your
              digital space, we turn ideas into impact.
            </p>

            <div className="actions">
              <button type="button" className="btn btn-primary">
                Contact
              </button>
              <button type="button" className="btn btn-secondary">
                See our plans <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>

        <div className="main-image-wrap">
          <Image
            src="/hero-main.png"
            alt="Futuristic hero portrait"
            className="main-image"
            fill
            sizes="(max-width: 760px) min(95vw, 500px), (max-width: 1200px) min(90vw, 630px), min(57vw, 680px)"
            priority
          />
        </div>

        <aside className="side-meta">
          <p>Develop</p>
          <p>Design</p>
          <p>Create</p>

          <a href="#faq" className="faq-link">
            <u>FAQ <span aria-hidden="true">↓</span></u>
          </a>
        </aside>

        <div className="side-image-wrap" aria-hidden="true">
          <Image
            src="/hero-side.png"
            alt=""
            fill
            className="side-image"
            sizes="(max-width: 760px) min(46vw, 180px), (max-width: 1200px) min(32vw, 230px), min(28vw, 310px)"
          />
        </div>

        <p className="ghost-text ghost-left">
          Design
          <br />
          with us
        </p>
        <p className="ghost-text ghost-right">
          website
          <br />
          now!
        </p>

        <div className="craft-journey-block">
          <p className="craft-label">Craft</p>
          <p className="journey-text">Join us to start your journey!</p>
        </div>
      </section>

      <div className="scroll-indicator" aria-hidden="true">
        <div className="mouse">
          <span />
        </div>
        <p>Scroll for more</p>
      </div>
    </main>
  );
}
