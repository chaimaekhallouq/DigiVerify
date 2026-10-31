import { FaBars, FaSignOutAlt } from 'react-icons/fa'
import { ROLE_LABELS } from '../../utils/constants'

function Topbar({ user, onMenuClick, onLogout }) {
  return (
    <header className="dv-topbar">
      <button
        type="button"
        className="dv-topbar__menu-btn"
        aria-label="Ouvrir le menu"
        onClick={onMenuClick}
      >
        <FaBars />
      </button>

      <div className="dv-topbar__spacer" />

      <div className="dv-topbar__user">
        <div className="dv-topbar__avatar" aria-hidden="true">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="dv-topbar__identity">
          <strong>{user.name}</strong>
          <small>{ROLE_LABELS[user.role]}</small>
        </div>
      </div>

      <button type="button" className="btn btn-outline-primary btn-sm" onClick={onLogout}>
        <FaSignOutAlt className="me-2" />
        Déconnexion
      </button>
    </header>
  )
}

export default Topbar