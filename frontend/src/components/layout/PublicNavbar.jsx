import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import Logo from './logo'

function PublicNavbar() {
  const [open, setOpen] = useState(false)
  const closeMenu = () => setOpen(false)

  return (
    <header className="dv-navbar">
      <div className="container dv-navbar__inner">
        <Logo />

        <button
          type="button"
          className="dv-navbar__toggle"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>

        <nav className={`dv-navbar__menu ${open ? 'is-open' : ''}`}>
          <NavLink to="/" end className="dv-nav-link" onClick={closeMenu}>
            Accueil
          </NavLink>
          <NavLink to="/verifier" className="dv-nav-link" onClick={closeMenu}>
            Vérifier un diplôme
          </NavLink>
          <Link to="/connexion" className="btn btn-outline-primary" onClick={closeMenu}>
            Connexion
          </Link>
          <Link to="/inscription" className="btn btn-primary" onClick={closeMenu}>
            Créer un compte
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default PublicNavbar