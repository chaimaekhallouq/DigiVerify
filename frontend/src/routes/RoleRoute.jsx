import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

// allowedRoles : liste des rôles autorisés, par exemple ['ADMIN']
function RoleRoute({ allowedRoles }) {
  const { user } = useAuth()
  const location = useLocation()

  // Non connecté : on envoie vers la connexion
  if (!user) {
    return <Navigate to="/connexion" state={{ from: location }} replace />
  }

  // Connecté mais mauvais rôle : accès refusé
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/acces-refuse" replace />
  }

  // Autorisé : on affiche la page demandée
  return <Outlet />
}

export default RoleRoute