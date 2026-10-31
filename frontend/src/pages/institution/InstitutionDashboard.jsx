import { Link } from 'react-router-dom'
import { FaUserGraduate, FaFileSignature, FaPen, FaBan, FaPlus, FaRedo } from 'react-icons/fa'
import { useAuth } from '../../hooks/useAuth'
import { useFetch } from '../../hooks/useFetch'
import { getInstitutionDashboard } from '../../api/statsApi'
import { formatDate } from '../../utils/formatters'
import PageHeader from '../../components/layout/PageHeader'
import LoadingState from '../../components/ui/LoadingState'
import Alert from '../../components/ui/Alert'
import StatCard from '../../components/ui/StatCard'
import StatusBadge from '../../components/ui/StatusBadge'
import DataTable from '../../components/ui/DataTable'

const columns = [
  { key: 'id', header: 'Référence' },
  { key: 'student', header: 'Étudiant' },
  { key: 'title', header: 'Diplôme' },
  { key: 'issuedAt', header: "Date d'émission", render: (row) => formatDate(row.issuedAt) },
  { key: 'status', header: 'Statut', render: (row) => <StatusBadge status={row.status} /> },
]

function InstitutionDashboard() {
  const { user } = useAuth()
  const { data, loading, error, reload } = useFetch(getInstitutionDashboard)

  return (
    <div className="container-fluid px-3 px-lg-4">
      <PageHeader
        title="Tableau de bord"
        subtitle={`Bienvenue, ${user.name}.`}
        actions={
          <Link to="/etablissement/diplomes/nouveau" className="btn btn-primary">
            <FaPlus className="me-2" />
            Créer un diplôme
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
            <div className="col-12 col-sm-6 col-xl-3">
              <StatCard icon={<FaUserGraduate />} label="Étudiants" value={data.students} />
            </div>
            <div className="col-12 col-sm-6 col-xl-3">
              <StatCard icon={<FaFileSignature />} label="Diplômes émis" value={data.issued} tone="success" />
            </div>
            <div className="col-12 col-sm-6 col-xl-3">
              <StatCard icon={<FaPen />} label="Brouillons" value={data.drafts} tone="warning" />
            </div>
            <div className="col-12 col-sm-6 col-xl-3">
              <StatCard icon={<FaBan />} label="Diplômes révoqués" value={data.revoked} tone="danger" />
            </div>
          </div>

          <div className="d-flex align-items-center justify-content-between mb-3">
            <h2 className="h5 mb-0">Derniers diplômes</h2>
            <Link to="/etablissement/diplomes" className="small">
              Voir tous les diplômes
            </Link>
          </div>
          <DataTable
            columns={columns}
            rows={data.recentDiplomas}
            emptyMessage="Aucun diplôme pour le moment."
            pageSize={5}
          />
        </>
      )}
    </div>
  )
}

export default InstitutionDashboard