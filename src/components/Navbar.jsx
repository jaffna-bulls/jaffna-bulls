import { NavLink, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './navbar.css';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about-us', label: 'About Us' },
  { to: '/rugby', label: 'Rugby' },
  { to: '/store', label: 'Store' },
  { to: '/contact-us', label: 'Contact Us' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, []);

  const isRugbySection = (path) => path === '/rugby' && window.location.pathname.startsWith('/rugby');

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand" onClick={() => setOpen(false)}>
          <img src="/header-logo.png" alt="Jaffna Bulls" className="navbar__brand-logo" />
          <span>Jaffna Bulls</span>
        </Link>

        <nav className={`navbar__nav ${open ? 'navbar__nav--open' : ''}`} aria-label="Primary">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    isActive || (link.to === '/rugby' && isRugbySection(link.to)) ? 'active' : ''
                  }
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="navbar__actions">
          <Link to="/store" className="navbar__cart">
            Cart · 0
          </Link>
          <button
            className={`navbar__toggle ${open ? 'is-open' : ''}`}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
