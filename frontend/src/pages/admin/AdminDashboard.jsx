import { Link } from 'react-router-dom'
import {
  FaUniversity,
  FaUsers,
  FaFileSignature,
  FaSearch,
  FaPlus,
  FaRedo,
} from 'react-icons/fa'
import { useAuth } from '../../hooks/useAuth'
import { useFetch } from '../../hooks/useFetch'
import { getAdminDashboard } from '../../api/statsApi'
import { formatDate } from '../../utils/formatters'
import PageHeader from '../../components/layout/PageHeader'
import LoadingState from '../../components/ui/LoadingState'
import Alert from '../../components/ui/Alert'
import StatCard from '../../components/ui/StatCard'
import StatusBadge from '../../components/ui/StatusBadge'
import DataTable from '../../components/ui/DataTable'

const columns = [
  { key: 'name', header: 'Établissement' },
  { key: 'city', header: 'Ville' },
  { key: 'diplomasIssued', header: 'Diplômes émis' },
  {
    key: 'certificateExpiresAt',
    header: 'Certificat valide jusqu’au',
    render: (row) => formatDate(row.certificateExpiresAt),
  },
  { key: 'status', header: 'Statut', render: (row) => <StatusBadge status={row.status} /> },
]

function AdminDashboard() {
  const { user } = useAuth()
  const { data, loading, error, reload } = useFetch(getAdminDashboard)

  return (
    <div className="container-fluid px-3 px-lg-4">
      <PageHeader
        title="Tableau de bord"
        subtitle={`Bienvenue, ${user.name}. Vue d'ensemble de la plateforme.`}
        actions={
          <Link to="/admin/etablissements" className="btn btn-primary">
            <FaPlus className="me-2" />
            Gérer les établissements
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
          {data.expiringCertificates > 0 && (
            <Alert variant="warning" title="Certificats à renouveler">
              {data.expiringCertificates === 1
                ? "Le certificat d'un établissement expire dans moins de 60 jours."
                : `Les certificats de ${data.expiringCertificates} établissements expirent dans moins de 60 jours.`}
            </Alert>
          )}

          <div className="row g-3 mb-4">
            <div className="col-12 col-sm-6 col-xl-3">
              <StatCard icon={<FaUniversity />} label="Établissements" value={data.institutions} />
            </div>
            <div className="col-12 col-sm-6 col-xl-3">
              <StatCard icon={<FaUsers />} label="Utilisateurs" value={data.users} tone="success" />
            </div>
            <div className="col-12 col-sm-6 col-xl-3">
              <StatCard
                icon={<FaFileSignature />}
                label="Diplômes émis"
                value={data.diplomasIssued.toLocaleString('fr-FR')}
                tone="warning"
              />
            </div>
            <div className="col-12 col-sm-6 col-xl-3">
              <StatCard
                icon={<FaSearch />}
                label="Vérifications"
                value={data.verifications.toLocaleString('fr-FR')}
                tone="danger"
              />
            </div>
          </div>

          <div className="d-flex align-items-center justify-content-between mb-3">
            <h2 className="h5 mb-0">Établissements récents</h2>
            <Link to="/admin/etablissements" className="small">
              Voir tous les établissements
            </Link>
          </div>
          <DataTable
            columns={columns}
            rows={data.recentInstitutions}
            emptyMessage="Aucun établissement pour le moment."
            pageSize={5}
          />
        </>
      )}
    </div>
  )
}

export default AdminDashboard