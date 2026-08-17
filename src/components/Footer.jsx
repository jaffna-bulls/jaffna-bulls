import { Link } from 'react-router-dom';
import Logo from './Logo';
import './footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <Link to="/" className="footer__brand">
          <Logo size={38} />
          <span>Jaffna Bulls</span>
        </Link>

        <p className="footer__tagline">One Team. One Pride. One Bull Nation.</p>

        <div className="footer__social" aria-label="Social media">
          <a href="#" aria-label="Instagram">IG</a>
          <a href="#" aria-label="Facebook">FB</a>
          <a href="#" aria-label="YouTube">YT</a>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span>© {new Date().getFullYear()} Jaffna Bulls. All rights reserved.</span>
          <span>Built for the Bull Nation.</span>
        </div>
      </div>
    </footer>
  );
}
