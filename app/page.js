import Image from "next/image";
import InteractiveEffects from "./InteractiveEffects";

export default function Home() {
  return (
    <>
      <InteractiveEffects />
      <div className="loader" id="loader">
        <div className="loader-bar" />
      </div>
      <div className="cursor" id="cursor" aria-hidden="true" />
      <div className="bg-grid" aria-hidden="true" />
      <div className="bg-gradient bg-gradient-1" aria-hidden="true" />
      <div className="bg-gradient bg-gradient-2" aria-hidden="true" />

      <nav className="nav">
        <a href="#" className="nav-logo">
          <span className="nav-logo-icon" />
          <span className="nav-logo-text">CYBORGLINK</span>
        </a>
        <div className="nav-links">
          <a href="#" className="nav-link">
            About Us
          </a>
          <span className="nav-link-divider">/</span>
          <a href="#" className="nav-link">
            Technology
          </a>
          <span className="nav-link-divider">/</span>
          <a href="#" className="nav-link">
            Latest Developments
          </a>
          <span className="nav-link-divider">/</span>
          <a href="#" className="nav-link">
            Resource
          </a>
        </div>
        <button type="button" className="nav-cta btn-magnetic">
          <span>Contact Us</span>
        </button>
        <button
          type="button"
          className="mobile-toggle"
          id="mobileToggle"
          aria-label="Toggle menu"
          aria-expanded="false"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <main className="hero">
        <div className="hero-inner">
          <div className="hero-content">
            <p className="hero-label">Introducing</p>
            <h1 className="hero-title">
              <span className="hero-title-line">
                <span className="hero-title-word">CYBORG</span>
              </span>
              <span className="hero-title-line">
                <span className="hero-title-word">CHRONICLES</span>
              </span>
            </h1>
            <p className="hero-description">
              Unveiling the evolution of human-machine integration. Discover
              how these cutting-edge creations are reshaping the boundaries of
              human potential and ushering in a new era of possibilities.
            </p>
            <div className="hero-buttons">
              <button type="button" className="btn btn-primary btn-magnetic">
                <span className="btn-text">Explore</span>
                <span className="btn-arrow">→</span>
              </button>
              <button type="button" className="btn btn-secondary btn-magnetic">
                <span className="btn-text">Technology</span>
              </button>
            </div>

            <div className="hero-divider">
              <div className="hero-divider-line"></div>
              <span className="hero-divider-text">Made by Humans</span>
              <div className="hero-divider-line"></div>
            </div>
          </div>
          <div className="hero-image-wrapper">
            <div className="hero-image-container">
              <Image
                src="/hero-main.png"
                alt="Cyborg Chronicles"
                fill
                priority
                sizes="(max-width: 768px) 340px, (max-width: 1024px) 380px, 480px"
              />
              <div className="hero-image-overlay" />
            </div>
            <div className="float-element float-1" />
            <div className="float-element float-2" />
            <div className="float-element float-3" />
          </div>
        </div>
      </main>

      <footer className="footer">
        <span className="footer-text">© 2026 CyborgLink. All rights reserved.</span>
        <div className="footer-links">
          <a href="#" className="footer-link">
            Privacy
          </a>
          <a href="#" className="footer-link">
            Terms
          </a>
          <a href="#" className="footer-link">
            Careers
          </a>
          <a href="#" className="footer-link">
            Contact
          </a>
        </div>
      </footer>

      <div className="bottom-bar">
        <div className="bottom-left">
          <span className="bottom-explore">Explore</span>
          <div className="bottom-counter">
            <span className="counter-num">02K</span>
            <span className="counter-separator-line" aria-hidden="true" />
            <span className="counter-num">21K</span>
          </div>
        </div>
        <div className="bottom-right">
          <div className="bottom-progress">
            <div className="bottom-progress-fill" />
          </div>
          <div className="bottom-nav">
            <button type="button" className="bottom-nav-btn" aria-label="Previous">
              ‹
            </button>
            <button type="button" className="bottom-nav-btn" aria-label="Next">
              ›
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
