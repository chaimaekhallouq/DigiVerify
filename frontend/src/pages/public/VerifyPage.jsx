import { useState } from 'react'
import { FaSearch, FaRedo } from 'react-icons/fa'
import { verifyPdf, verifyById } from '../../api/verificationApi'
import PageHeader from '../../components/layout/PageHeader'
import Alert from '../../components/ui/Alert'
import FormField from '../../components/ui/FormField'
import PdfDropzone from '../../components/verification/PdfDropzone'
import VerificationResult from '../../components/verification/VerificationResult'

const MAX_SIZE = 10 * 1024 * 1024 // 10 Mo

function VerifyPage({ embedded = false }) {
  const [mode, setMode] = useState('pdf') // 'pdf' | 'ref'
  const [file, setFile] = useState(null)
  const [reference, setReference] = useState('')
  const [fieldError, setFieldError] = useState('')
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')
  const [response, setResponse] = useState(null)

  const reset = () => {
    setFile(null)
    setReference('')
    setFieldError('')
    setServerError('')
    setResponse(null)
  }

  const changeMode = (m) => {
    setMode(m)
    setFieldError('')
    setServerError('')
  }

  const handleFile = (f) => {
    setServerError('')
    const isPdf = f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf')
    if (!isPdf) {
      setFile(null)
      setFieldError('Seuls les fichiers PDF sont acceptés.')
    } else if (f.size > MAX_SIZE) {
      setFile(null)
      setFieldError('Le fichier dépasse la taille maximale de 10 Mo.')
    } else {
      setFile(f)
      setFieldError('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerError('')

    let target = null
    if (mode === 'pdf') {
      if (!file) {
        setFieldError('Veuillez sélectionner un fichier PDF.')
        return
      }
    } else {
      // On accepte la référence seule ou l'adresse complète du QR Code
      target = reference.trim().split('/').filter(Boolean).pop()
      if (!target) {
        setFieldError('Veuillez saisir une référence ou une adresse de vérification.')
        return
      }
    }

    setFieldError('')
    setLoading(true)
    try {
      const result = mode === 'pdf' ? await verifyPdf(file) : await verifyById(target)
      setResponse(result)
    } catch (err) {
      setServerError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={embedded ? 'container-fluid px-3 px-lg-4' : 'container py-5'}>
      <PageHeader
        title="Vérifier un diplôme"
        subtitle="Contrôlez l'authenticité d'un diplôme en quelques secondes."
      />

      <div style={{ maxWidth: 760 }}>
        {response ? (
          <>
            <VerificationResult response={response} />
            <button type="button" className="btn btn-primary mt-4" onClick={reset}>
              <FaRedo className="me-2" />
              Nouvelle vérification
            </button>
          </>
        ) : (
          <div className="dv-card p-4">
            <div className="dv-filter" role="group" aria-label="Méthode de vérification">
              <button
                type="button"
                className={`dv-filter__btn ${mode === 'pdf' ? 'is-active' : ''}`}
                onClick={() => changeMode('pdf')}
              >
                Déposer un fichier PDF
              </button>
              <button
                type="button"
                className={`dv-filter__btn ${mode === 'ref' ? 'is-active' : ''}`}
                onClick={() => changeMode('ref')}
              >
                Saisir une référence
              </button>
            </div>

            {serverError && (
              <Alert variant="danger" title="Vérification impossible">
                {serverError}
              </Alert>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {mode === 'pdf' ? (
                <PdfDropzone file={file} onFile={handleFile} error={fieldError} disabled={loading} />
              ) : (
                <FormField
                  id="reference"
                  label="Référence ou adresse du QR Code"
                  placeholder="DV-2026-0001"
                  helpText="Vous pouvez aussi coller l'adresse complète lue dans le QR Code."
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  error={fieldError}
                  disabled={loading}
                />
              )}

              <button type="submit" className="btn btn-primary w-100 mt-3" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />
                    Vérification en cours…
                  </>
                ) : (
                  <>
                    <FaSearch className="me-2" />
                    Vérifier le diplôme
                  </>
                )}
              </button>
            </form>

            <p className="small text-muted mt-3 mb-0">
              Le fichier est envoyé au serveur, qui calcule son empreinte et contrôle la signature.
              Aucune vérification cryptographique n'est faite dans votre navigateur.
            </p>
          </div>
        )}

        {import.meta.env.VITE_USE_MOCKS === 'true' && !response && (
          <div className="mt-3">
            <Alert variant="info" title="Mode démonstration">
              <div className="small">
                Le résultat dépend du <strong>nom du fichier</strong> : « modifie » donne Modifié,
                « revoque » Révoqué, « inconnu » Non fiable, « invalide » Invalide, tout autre nom
                Authentique. Références à tester : DV-2026-0001 (authentique), DV-2026-0004 (révoqué),
                DV-9999 (invalide).
              </div>
            </Alert>
          </div>
        )}
      </div>
    </div>
  )
}

export default VerifyPage