import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaPaperPlane } from 'react-icons/fa'
import { forgotPassword } from '../../api/authApi'
import { EMAIL_REGEX } from '../../utils/validators'
import FormField from '../../components/ui/FormField'
import Alert from '../../components/ui/Alert'

function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerError('')

    if (!email.trim()) {
      setError("L'adresse e-mail est obligatoire.")
      return
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      setError('Veuillez saisir une adresse e-mail valide.')
      return
    }
    setError('')

    setLoading(true)
    try {
      await forgotPassword(email.trim())
      setSent(true)
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
          <h1 className="h3 mb-1">Mot de passe oublié</h1>
          <p className="text-muted mb-0">
            Saisissez votre adresse e-mail pour recevoir un lien de réinitialisation.
          </p>
        </div>

        {sent ? (
          <Alert variant="success" title="Demande envoyée">
            Si un compte est associé à cette adresse, un e-mail contenant les instructions
            vient de vous être envoyé.
          </Alert>
        ) : (
          <>
            {serverError && (
              <Alert variant="danger" title="Envoi impossible">
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
                error={error}
              />

              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />
                    Envoi en cours…
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="me-2" />
                    Envoyer le lien
                  </>
                )}
              </button>
            </form>
          </>
        )}

        <p className="text-center mt-4 mb-0">
          <Link to="/connexion">Retour à la connexion</Link>
        </p>
      </div>
    </div>
  )
}

export default ForgotPasswordPage