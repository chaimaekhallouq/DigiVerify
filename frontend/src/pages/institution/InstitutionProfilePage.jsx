import { FaRedo } from 'react-icons/fa'
import { useFetch } from '../../hooks/useFetch'
import { getMyInstitution } from '../../api/institutionsApi'
import { formatDate } from '../../utils/formatters'
import PageHeader from '../../components/layout/PageHeader'
import LoadingState from '../../components/ui/LoadingState'
import Alert from '../../components/ui/Alert'
import StatusBadge from '../../components/ui/StatusBadge'

function InstitutionProfilePage() {
  const { data, loading, error, reload } = useFetch(getMyInstitution)

  const daysLeft = data
    ? Math.ceil((new Date(data.certificate.validTo) - new Date()) / (1000 * 60 * 60 * 24))
    : null

  return (
    <div className="container-fluid px-3 px-lg-4">
      <PageHeader title="Mon établissement" subtitle="Informations et certificat numérique." />

      {loading && <LoadingState message="Chargement…" />}

      {error && (
        <Alert variant="danger" title="Erreur de chargement">
          <p className="mb-2">{error}</p>
          <button type="button" className="btn btn-outline-primary btn-sm" onClick={reload}>
            <FaRedo className="me-2" />
            Réessayer
          </button>
        </Alert>
      )}

      {data && (
        <div className="row g-4">
          <div className="col-12 col-lg-6">
            <div className="dv-card p-4 h-100">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="h5 mb-0">Établissement</h2>
                <StatusBadge status={data.status} />
              </div>
              <dl className="dv-diploma__meta mb-0">
                <dt>Nom</dt>
                <dd>{data.name}</dd>
                <dt>Ville</dt>
                <dd>{data.city}</dd>
                <dt>Contact</dt>
                <dd>{data.contactEmail}</dd>
              </dl>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="dv-card p-4 h-100">
              <h2 className="h5 mb-3">Certificat numérique X.509</h2>
              {daysLeft !== null && daysLeft < 60 && (
                <Alert variant="warning" title="Renouvellement nécessaire">
                  Votre certificat expire dans {daysLeft} jours. Contactez l'administrateur.
                </Alert>
              )}
              <dl className="dv-diploma__meta mb-0">
                <dt>Statut</dt>
                <dd>{data.certificate.status === 'VALID' ? 'Valide' : data.certificate.status}</dd>
                <dt>Sujet</dt>
                <dd>{data.certificate.subject}</dd>
                <dt>Émetteur</dt>
                <dd>{data.certificate.issuer}</dd>
                <dt>Valide du</dt>
                <dd>{formatDate(data.certificate.validFrom)}</dd>
                <dt>Jusqu'au</dt>
                <dd>{formatDate(data.certificate.validTo)}</dd>
                <dt>Empreinte</dt>
                <dd className="dv-hash">{data.certificate.fingerprint}</dd>
              </dl>
              <p className="small text-muted mt-3 mb-0">
                La clé privée de votre établissement reste sur le serveur. Elle n'est jamais
                transmise ni affichée dans l'application.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default InstitutionProfilePage