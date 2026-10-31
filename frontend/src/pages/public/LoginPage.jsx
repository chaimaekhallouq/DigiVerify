import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { FaSignInAlt } from 'react-icons/fa'
import { useAuth } from '../../hooks/useAuth'
import { ROLE_HOME } from '../../utils/constants'
import FormField from '../../components/ui/FormField'
import Alert from '../../components/ui/Alert'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function LoginPage() {
  const { user, login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  // Déjà connecté : on renvoie directement vers son espace
  if (user) {
    return <Navigate to={ROLE_HOME[user.role] || '/'} replace />
  }

  const validate = () => {
    const newErrors = {}
    if (!email.trim()) {
      newErrors.email = "L'adresse e-mail est obligatoire."
    } else if (!EMAIL_REGEX.test(email.trim())) {
      newErrors.email = "Veuillez saisir une adresse e-mail valide."
    }
    if (!password) {
      newErrors.password = 'Le mot de passe est obligatoire.'
    }
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerError('')

    const newErrors = validate()
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setLoading(true)
    try {
      const loggedUser = await login(email, password)
      navigate(ROLE_HOME[loggedUser.role] || '/', { replace: true })
    } catch (err) {
      setServerError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-5">
      <div className="dv-card p-4 p-md-5 mx-auto" style={{ maxWidth: 460 }}>
        <div className="text-center mb-4">
          <h1 className="h3 mb-1">Connexion</h1>
          <p className="text-muted mb-0">Accédez à votre espace DigiVerify.</p>
        </div>

        {serverError && (
          <Alert variant="danger" title="Connexion impossible">
            {serverError}
          </Alert>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <FormField
            id="email"
            label="Adresse e-mail"
            type="email"
            placeholder="prenom.nom@exemple.fr"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />

          <FormField
            id="password"
            label="Mot de passe"
            type="password"
            placeholder="Votre mot de passe"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />

          <div className="text-end mb-3">
            <Link to="/mot-de-passe-oublie" className="small">
              Mot de passe oublié ?
            </Link>
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />
                Connexion en cours…
              </>
            ) : (
              <>
                <FaSignInAlt className="me-2" />
                Se connecter
              </>
            )}
          </button>
        </form>

        <p className="text-center text-muted mt-4 mb-0">
          Pas encore de compte ? <Link to="/inscription">Créer un compte</Link>
        </p>
      </div>

      {import.meta.env.VITE_USE_MOCKS === 'true' && (
        <div className="mx-auto mt-4" style={{ maxWidth: 460 }}>
          <Alert variant="info" title="Mode démonstration (comptes fictifs)">
            <ul className="mb-0 ps-3 small">
              <li>Administrateur : admin@digiverify.fr / Admin123!</li>
              <li>Établissement : etablissement@digiverify.fr / Etab123!</li>
              <li>Étudiant : etudiant@digiverify.fr / Etud123!</li>
              <li>Recruteur : recruteur@digiverify.fr / Recr123!</li>
            </ul>
          </Alert>
        </div>
      )}
    </div>
  )
}

export default LoginPage