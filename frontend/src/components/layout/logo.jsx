import { Link } from 'react-router-dom'
import { FaShieldAlt } from 'react-icons/fa'

function Logo({ to = '/', light = false }) {
  return (
    <Link to={to} className={`dv-logo ${light ? 'dv-logo--light' : ''}`}>
      <span className="dv-logo__icon">
        <FaShieldAlt />
      </span>
      <span className="dv-logo__text">
        Digi<strong>Verify</strong>
      </span>
    </Link>
  )
}

export default Logo