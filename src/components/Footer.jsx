import { Link } from "react-router-dom";
import Logo from "./Logo";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      {/* First row */}
      <div className="container footer__inner">
        <Link to="/" className="footer__brand">
          <img
            src="/header-logo.png"
            alt="Jaffna Bulls"
            className="footer__logo"
          />
          <span>Jaffna Bulls</span>
        </Link>

        <p className="footer__tagline">One Team. One Pride. One Bull Nation.</p>

        <div className="footer__social" aria-label="Social media">
          <a
            href="https://www.instagram.com/jaffnabulls"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="footer__social-icon"
            >
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <circle
                cx="12"
                cy="12"
                r="4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
            </svg>
          </a>

          <a
            href="https://www.tiktok.com/@jaffna.bulls?_r=1&_t=ZS-98z0uGsPrds"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="footer__social-icon"
            >
              <path
                d="M15.5 4c.3 2 1.5 3.3 3.5 3.5v3.1c-1.4 0-2.6-.4-3.6-1.1v5.8c0 3.1-2.1 5.2-5.1 5.2-2.8 0-4.8-2-4.8-4.7 0-2.8 2.2-4.8 5-4.8.4 0 .8 0 1.2.1v3.1c-.4-.1-.7-.2-1.1-.2-1.1 0-1.9.7-1.9 1.8 0 1 .7 1.7 1.7 1.7 1.1 0 1.9-.8 1.9-2.1V4h3.2Z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Contact row */}
      <div className="footer__contact-row">
        <div className="container footer__contact-inner">
          <p>
            Have a question or want to connect?{" "}
            <span>We'd love to hear from you.</span>
          </p>

          <a href="mailto:hello@jaffnabulls.com">hello@jaffnabulls.com </a>
        </div>
      </div>

      {/* Copyright row */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span>
            © {new Date().getFullYear()} Jaffna Bulls. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
