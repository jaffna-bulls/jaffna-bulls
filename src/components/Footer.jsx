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
            IG
          </a>

          <a
            href="https://www.tiktok.com/@jaffna.bulls?_r=1&_t=ZS-98z0uGsPrds"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
          >
            TT
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
