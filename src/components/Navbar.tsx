import { NavLink } from 'react-router-dom'
import './Navbar.css'

const links = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/posts', label: 'Posts' },
  { to: '/artwork', label: 'Art' },
]

export function Navbar() {
  return (
    <nav className="navbar">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.to === '/'}
          className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  )
}
