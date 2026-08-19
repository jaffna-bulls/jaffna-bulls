import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import "./navbar.css";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about-us", label: "About Us" },
  {
    to: "/rugby",
    label: "Rugby",
    children: [
      { to: "/rugby/squad", tag: "01", title: "Squad" },
      {
        to: "/rugby/coaching-staff",
        tag: "02",
        title: "Coaching Staff",
      },
      { to: "/rugby/fixtures", tag: "03", title: "Fixtures" },
    ],
  },
  { to: "/store", label: "Store" },
  { to: "/contact-us", label: "Contact Us" },
];

export default function Navbar({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);

    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand" onClick={() => setOpen(false)}>
          <img
            src="/header-logo.png"
            alt="Jaffna Bulls"
            className="navbar__brand-logo"
          />
          <span>Jaffna Bulls</span>
        </Link>

        <nav
          className={`navbar__nav ${open ? "navbar__nav--open" : ""}`}
          aria-label="Primary"
        >
          <ul>
            {NAV_LINKS.map((link) => (
              <li
                key={link.to}
                className={link.children ? "navbar__nav-item--has-submenu" : ""}
              >
                <NavLink
                  to={link.to}
                  end={link.to === "/" || link.to === "/rugby"}
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={() => setOpen(false)}
                >
                  {link.label}

                  {link.children && (
                    <span
                      className="navbar__dropdown-icon"
                      aria-hidden="true"
                    />
                  )}
                </NavLink>

                {link.children && (
                  <div className="navbar__submenu">
                    {link.children.map((child) => (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        // This is important for /rugby.
                        // Without `end`, /rugby would also match
                        // /rugby/squad, /rugby/fixtures, etc.
                        end
                        onClick={() => setOpen(false)}
                      >
                        <span>{child.tag}</span>
                        {child.title}
                      </NavLink>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="navbar__actions">
          <button
            className={`navbar__theme-toggle ${theme === "dark" ? "is-dark" : ""}`}
            type="button"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            aria-pressed={theme === "dark"}
            onClick={onToggleTheme}
          >
            <span className="navbar__theme-label">
              Theme: {theme === "dark" ? "Dark" : "Light"}
            </span>
            <span className="navbar__theme-switch" aria-hidden="true">
              <span className="navbar__theme-icon">
                {theme === "dark" ? "☾" : "☀"}
              </span>
              <span className="navbar__theme-thumb" />
            </span>
          </button>

          <Link to="/store" className="navbar__cart">
            Shop Now
          </Link>

          <button
            className={`navbar__toggle ${open ? "is-open" : ""}`}
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
