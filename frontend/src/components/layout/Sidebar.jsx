import { NavLink } from 'react-router-dom'
import Logo from './logo'

function Sidebar({ items, homePath, open, onClose }) {
  return (
    <>
      {open && <div className="dv-sidebar__overlay" onClick={onClose} aria-hidden="true" />}

      <aside className={`dv-sidebar ${open ? 'is-open' : ''}`} aria-label="Menu principal">
        <div className="dv-sidebar__brand">
          <Logo light to={homePath} />
        </div>

        <nav className="dv-sidebar__nav">
          {items.map(({ label, to, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className="dv-sidebar__link"
              onClick={onClose}
            >
              <Icon />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}

export default Sidebar