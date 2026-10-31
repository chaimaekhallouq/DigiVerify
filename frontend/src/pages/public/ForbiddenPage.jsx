import { Link } from 'react-router-dom'
import { FaLock } from 'react-icons/fa'
import { useAuth } from '../../hooks/useAuth'
import { ROLE_HOME } from '../../utils/constants'

function ForbiddenPage() {
  const { user } = useAuth()
  const homePath = user ? ROLE_HOME[user.role] || '/' : '/'

  return (
    <div className="container py-5">
      <div className="dv-card p-5 text-center mx-auto" style={{ maxWidth: 560 }}>
        <FaLock size={36} className="text-danger mb-3" />
        <h1 className="h3">Accès refusé</h1>
        <p className="text-muted">
          Vous n'avez pas l'autorisation d'accéder à cette page.
        </p>
        <Link to={homePath} className="btn btn-primary">
          {user ? 'Retour à mon espace' : "Retour à l'accueil"}
        </Link>
      </div>
    </div>
  )
}

export default ForbiddenPage