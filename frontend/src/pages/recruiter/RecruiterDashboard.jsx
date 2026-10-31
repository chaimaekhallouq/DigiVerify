import { Link } from 'react-router-dom'
import { FaSearch, FaCheckCircle, FaExclamationTriangle, FaClipboardCheck, FaRedo } from 'react-icons/fa'
import { useAuth } from '../../hooks/useAuth'
import { useFetch } from '../../hooks/useFetch'
import { getRecruiterDashboard } from '../../api/verificationApi'
import PageHeader from '../../components/layout/PageHeader'
import LoadingState from '../../components/ui/LoadingState'
import Alert from '../../components/ui/Alert'
import StatCard from '../../components/ui/StatCard'
import VerificationHistoryTable from '../../components/verification/VerificationHistoryTable'

function RecruiterDashboard() {
  const { user } = useAuth()
  const { data, loading, error, reload } = useFetch(getRecruiterDashboard)

  return (
    <div className="container-fluid px-3 px-lg-4">
      <PageHeader
        title="Tableau de bord"
        subtitle={`Bienvenue, ${user.name}.`}
        actions={
          <Link to="/recruteur/verifier" className="btn btn-primary">
            <FaSearch className="me-2" />
            Vérifier un diplôme
          </Link>
        }
      />

      {loading && <LoadingState message="Chargement du tableau de bord…" />}

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
        <>
          <div className="row g-3 mb-4">
            <div className="col-12 col-sm-4">
              <StatCard icon={<FaClipboardCheck />} label="Vérifications effectuées" value={data.total} />
            </div>
            <div className="col-12 col-sm-4">
              <StatCard icon={<FaCheckCircle />} label="Diplômes authentiques" value={data.authentic} tone="success" />
            </div>
            <div className="col-12 col-sm-4">
              <StatCard icon={<FaExclamationTriangle />} label="Résultats à risque" value={data.problems} tone="danger" />
            </div>
          </div>

          <div className="d-flex align-items-center justify-content-between mb-3">
            <h2 className="h5 mb-0">Dernières vérifications</h2>
            <Link to="/recruteur/historique" className="small">
              Voir tout l'historique
            </Link>
          </div>
          <VerificationHistoryTable rows={data.recentVerifications} />
        </>
      )}
    </div>
  )
}

export default RecruiterDashboard