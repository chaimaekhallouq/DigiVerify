import { FaRedo } from 'react-icons/fa'
import { useFetch } from '../../hooks/useFetch'
import { getAdminReports } from '../../api/statsApi'
import PageHeader from '../../components/layout/PageHeader'
import LoadingState from '../../components/ui/LoadingState'
import Alert from '../../components/ui/Alert'
import BarChart from '../../components/ui/BarChart'

const RESULT_ITEMS = [
  { key: 'AUTHENTIC', label: 'Authentiques', tone: 'authentic' },
  { key: 'MODIFIED', label: 'Modifiés', tone: 'modified' },
  { key: 'INVALID', label: 'Invalides', tone: 'invalid' },
  { key: 'REVOKED', label: 'Révoqués', tone: 'revoked' },
  { key: 'UNTRUSTED', label: 'Non fiables', tone: 'untrusted' },
]

function ReportsPage() {
  const { data, loading, error, reload } = useFetch(getAdminReports)

  return (
    <div className="container-fluid px-3 px-lg-4">
      <PageHeader title="Rapports" subtitle="Activité globale de la plateforme." />

      {loading && <LoadingState message="Chargement des rapports…" />}

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
          <div className="col-12 col-xl-4">
            <div className="dv-card p-4 h-100">
              <h2 className="h5 mb-3">Vérifications par résultat</h2>
              <BarChart
                items={RESULT_ITEMS.map((r) => ({
                  label: r.label,
                  tone: r.tone,
                  value: data.verificationsByResult[r.key] || 0,
                }))}
              />
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-4">
            <div className="dv-card p-4 h-100">
              <h2 className="h5 mb-3">Diplômes émis par mois</h2>
              <BarChart items={data.monthly.map((m) => ({ label: m.month, value: m.issued, tone: 'primary' }))} />
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-4">
            <div className="dv-card p-4 h-100">
              <h2 className="h5 mb-3">Vérifications par mois</h2>
              <BarChart items={data.monthly.map((m) => ({ label: m.month, value: m.verified, tone: 'authentic' }))} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReportsPage