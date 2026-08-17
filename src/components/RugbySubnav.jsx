import { NavLink } from 'react-router-dom';
import './rugbySubnav.css';

const TABS = [
  { to: '/rugby', label: 'Rugby Home', end: true },
  { to: '/rugby/squad', label: 'Squad' },
  { to: '/rugby/coaching-staff', label: 'Coaching Staff' },
  { to: '/rugby/fixtures', label: 'Fixtures' },
];

export default function RugbySubnav() {
  return (
    <div className="rugby-subnav">
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.end}
          className={({ isActive }) => `rugby-subnav__tab ${isActive ? 'is-active' : ''}`}
        >
          {tab.label}
        </NavLink>
      ))}
    </div>
  );
}
