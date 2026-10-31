import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { FaUserPlus } from 'react-icons/fa'
import { useAuth } from '../../hooks/useAuth'
import { register } from '../../api/authApi'
import { ROLE_HOME, ROLES, ROLE_LABELS } from '../../utils/constants'
import { EMAIL_REGEX, validatePassword } from '../../utils/validators'
import FormField from '../../components/ui/FormField'
import Alert from '../../components/ui/Alert'

function RegisterPage() {
  const { user } = useAuth()

  const [form, setForm] = useState({
    name: '',
    email: '',
    role: ROLES.STUDENT,
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  if (user) {
    return <Navigate to={ROLE_HOME[user.role] || '/'} replace />
  }

  // Met à jour un seul champ du formulaire
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const validate = () => {
    const newErrors = {}
    if (form.name.trim().length < 2) {
      newErrors.name = 'Le nom complet est obligatoire (2 caractères minimum).'
    }
    if (!form.email.trim()) {
      newErrors.email = "L'adresse e-mail est obligatoire."
    } else if (!EMAIL_REGEX.test(form.email.trim())) {
      newErrors.email = 'Veuillez saisir une adresse e-mail valide.'
    }
    const passwordError = validatePassword(form.password)
    if (passwordError) {
      newErrors.password = passwordError
    }
    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Veuillez confirmer le mot de passe.'
    } else if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas.'
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
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      })
      setSuccess(true)
    } catch (err) {
      setServerError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Écran de confirmation après une inscription réussie
  if (success) {
    return (
      <div className="container py-5">
        <div className="dv-card p-4 p-md-5 mx-auto text-center" style={{ maxWidth: 460 }}>
          <Alert variant="success" title="Compte créé avec succès">
            Votre compte a bien été créé. Vous pouvez maintenant vous connecter.
          </Alert>
          <Link to="/connexion" className="btn btn-primary w-100">
            Aller à la connexion
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <div className="dv-card p-4 p-md-5 mx-auto" style={{ maxWidth: 520 }}>
        <div className="text-center mb-4">
          <h1 className="h3 mb-1">Créer un compte</h1>
          <p className="text-muted mb-0">Rejoignez la plateforme DigiVerify.</p>
        </div>

        {serverError && (
          <Alert variant="danger" title="Inscription impossible">
            {serverError}
          </Alert>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <FormField
            id="name"
            name="name"
            label="Nom complet"
            placeholder="Camille Martin"
            autoComplete="name"
            required
            value={form.name}
            onChange={handleChange}
            error={errors.name}
          />

          <FormField
            id="email"
            name="email"
            label="Adresse e-mail"
            type="email"
            placeholder="prenom.nom@exemple.fr"
            autoComplete="email"
            required
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />

          <div className="mb-3">
            <label htmlFor="role" className="form-label">
              Je suis <span className="text-danger">*</span>
            </label>
            <select
              id="role"
              name="role"
              className="form-select"
              value={form.role}
              onChange={handleChange}
            >
              <option value={ROLES.STUDENT}>{ROLE_LABELS.STUDENT}</option>
              <option value={ROLES.RECRUITER}>{ROLE_LABELS.RECRUITER}</option>
            </select>
            <div className="form-text">
              Les comptes Établissement sont créés par l'administrateur de la plateforme.
            </div>
          </div>

          <FormField
            id="password"
            name="password"
            label="Mot de passe"
            type="password"
            placeholder="Votre mot de passe"
            autoComplete="new-password"
            helpText="8 caractères minimum, avec majuscule, minuscule, chiffre et caractère spécial."
            required
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />

          <FormField
            id="confirmPassword"
            name="confirmPassword"
            label="Confirmer le mot de passe"
            type="password"
            placeholder="Saisissez-le à nouveau"
            autoComplete="new-password"
            required
            value={form.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />
                Création en cours…
              </>
            ) : (
              <>
                <FaUserPlus className="me-2" />
                Créer mon compte
              </>
            )}
          </button>
        </form>

        <p className="text-center text-muted mt-4 mb-0">
          Déjà inscrit ? <Link to="/connexion">Se connecter</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage