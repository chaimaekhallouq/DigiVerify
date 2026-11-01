import { useCallback, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaArrowLeft, FaFileSignature, FaBan, FaDownload, FaRedo } from 'react-icons/fa'
import { useFetch } from '../../hooks/useFetch'
import { getDiploma, issueDiploma, revokeDiploma, downloadDiplomaPdf } from '../../api/diplomasApi'
import { saveBlob } from '../../utils/download'
import { formatDate } from '../../utils/formatters'
import PageHeader from '../../components/layout/PageHeader'
import LoadingState from '../../components/ui/LoadingState'
import Alert from '../../components/ui/Alert'
import StatusBadge from '../../components/ui/StatusBadge'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import DiplomaPreview from '../../components/diploma/DiplomaPreview'

function DiplomaDetailPage() {
  const { id } = useParams()
  const fetcher = useCallback(() => getDiploma(id), [id]) // fonction stable pour useFetch
  const { data, loading, error, reload } = useFetch(fetcher)

  const [updated, setUpdated] = useState(null) // diplôme mis à jour après une action
  const [dialog, setDialog] = useState(null) // 'issue' | 'revoke' | null
  const [reason, setReason] = useState('')
  const [reasonError, setReasonError] = useState('')
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState(null)

  const diploma = updated || data

  const run = async (action, successMessage) => {
    setBusy(true)
    try {
      const result = await action()
      setUpdated(result)
      setNotice({ variant: 'success', message: successMessage })
    } catch (err) {
      setNotice({ variant: 'danger', message: err.message })
    } finally {
      setBusy(false)
      setDialog(null)
    }
  }

  const handleIssue = () =>
    run(() => issueDiploma(diploma.id), 'Le diplôme a été signé et émis avec succès.')

  const handleRevoke = () => {
    if (reason.trim().length < 5) {
      setReasonError('Veuillez indiquer un motif (5 caractères minimum).')
      return
    }
    run(() => revokeDiploma(diploma.id, reason), 'Le diplôme a été révoqué.')
  }

  const handleDownload = async () => {
    setNotice(null)
    try {
      const blob = await downloadDiplomaPdf(diploma.id)
      if (blob) {
        saveBlob(blob, `diplome-${diploma.id}.pdf`)
      } else {
        setNotice({
          variant: 'info',
          message: "Mode démonstration : le PDF officiel signé sera généré par le serveur.",
        })
      }
    } catch (err) {
      setNotice({ variant: 'danger', message: err.message })
    }
  }

  return (
    <div className="container-fluid px-3 px-lg-4">
      <PageHeader
        title="Détail du diplôme"
        subtitle={diploma ? `Référence ${diploma.id}` : ''}
        actions={
          <Link to="/etablissement/diplomes" className="btn btn-outline-primary">
            <FaArrowLeft className="me-2" />
            Retour à la liste
          </Link>
        }
      />

      {loading && <LoadingState message="Chargement du diplôme…" />}

      {error && (
        <Alert variant="danger" title="Erreur de chargement">
          <p className="mb-2">{error}</p>
          <button type="button" className="btn btn-outline-primary btn-sm" onClick={reload}>
            <FaRedo className="me-2" />
            Réessayer
          </button>
        </Alert>
      )}

      {notice && (
        <Alert variant={notice.variant} onClose={() => setNotice(null)}>
          {notice.message}
        </Alert>
      )}

      {diploma && (
        <div className="row g-4">
          <div className="col-12 col-xl-7">
            <DiplomaPreview diploma={diploma} />
          </div>

          <div className="col-12 col-xl-5">
            <div className="dv-card p-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h2 className="h5 mb-0">Informations</h2>
                <StatusBadge status={diploma.status} />
              </div>

              <dl className="dv-diploma__meta">
                <dt>Étudiant</dt>
                <dd>{diploma.student}</dd>
                <dt>Diplôme</dt>
                <dd>{diploma.title}</dd>
                <dt>Niveau</dt>
                <dd>{diploma.level}</dd>
                <dt>Obtenu le</dt>
                <dd>{formatDate(diploma.graduationDate)}</dd>
                <dt>Émis le</dt>
                <dd>{formatDate(diploma.issuedAt)}</dd>
                {diploma.signatureAlgorithm && (
                  <>
                    <dt>Signature</dt>
                    <dd>{diploma.signatureAlgorithm}</dd>
                  </>
                )}
                {diploma.sha256 && (
                  <>
                    <dt>Empreinte</dt>
                    <dd className="dv-hash">{diploma.sha256}</dd>
                  </>
                )}
                {diploma.revokedReason && (
                  <>
                    <dt>Motif</dt>
                    <dd>{diploma.revokedReason}</dd>
                  </>
                )}
              </dl>

              <div className="d-flex flex-wrap gap-2">
                {diploma.status === 'DRAFT' && (
                  <button type="button" className="btn btn-primary" onClick={() => setDialog('issue')}>
                    <FaFileSignature className="me-2" />
                    Signer et émettre
                  </button>
                )}
                {diploma.status === 'ISSUED' && (
                  <>
                    <button type="button" className="btn btn-primary" onClick={handleDownload}>
                      <FaDownload className="me-2" />
                      Télécharger le diplôme
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => {
                        setReason('')
                        setReasonError('')
                        setDialog('revoke')
                      }}
                    >
                      <FaBan className="me-2" />
                      Révoquer
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {dialog === 'issue' && (
        <ConfirmDialog
          title="Signer et émettre le diplôme"
          confirmLabel="Signer et émettre"
          busy={busy}
          onConfirm={handleIssue}
          onCancel={() => setDialog(null)}
        >
          <p className="mb-2">
            Le serveur va calculer l'empreinte du diplôme, le signer avec la clé de votre
            établissement et générer le PDF avec son QR Code.
          </p>
          <p className="mb-0 fw-semibold">Cette action est définitive : le diplôme ne pourra plus être modifié.</p>
        </ConfirmDialog>
      )}

      {dialog === 'revoke' && (
        <ConfirmDialog
          title="Révoquer le diplôme"
          confirmLabel="Révoquer"
          danger
          busy={busy}
          onConfirm={handleRevoke}
          onCancel={() => setDialog(null)}
        >
          <p>Un diplôme révoqué sera signalé comme tel lors de toute vérification.</p>
          <label htmlFor="reason" className="form-label">
            Motif de la révocation <span className="text-danger">*</span>
          </label>
          <textarea
            id="reason"
            rows={3}
            className={`form-control ${reasonError ? 'is-invalid' : ''}`}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          {reasonError && <div className="invalid-feedback">{reasonError}</div>}
        </ConfirmDialog>
      )}
    </div>
  )
}

export default DiplomaDetailPage