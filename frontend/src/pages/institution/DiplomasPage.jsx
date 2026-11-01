import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaPlus, FaRedo, FaEye } from 'react-icons/fa'
import { useFetch } from '../../hooks/useFetch'
import { getInstitutionDiplomas } from '../../api/diplomasApi'
import { formatDate } from '../../utils/formatters'
import PageHeader from '../../components/layout/PageHeader'
import LoadingState from '../../components/ui/LoadingState'
import Alert from '../../components/ui/Alert'
import DataTable from '../../components/ui/DataTable'
import StatusBadge from '../../components/ui/StatusBadge'
import StatusFilter from '../../components/ui/StatusFilter'

const columns = [
  { key: 'id', header: 'Référence' },
  { key: 'student', header: 'Étudiant' },
  { key: 'title', header: 'Diplôme' },
  { key: 'level', header: 'Niveau' },
  { key: 'issuedAt', header: "Date d'émission", render: (row) => formatDate(row.issuedAt) },
  { key: 'status', header: 'Statut', render: (row) => <StatusBadge status={row.status} /> },
  {
    key: 'actions',
    header: 'Actions',
    render: (row) => (
      <Link to={`/etablissement/diplomes/${row.id}`} className="btn btn-outline-primary btn-sm">
        <FaEye className="me-2" />
        Voir
      </Link>
    ),
  },
]

function DiplomasPage() {
  const { data, loading, error, reload } = useFetch(getInstitutionDiplomas)
  const [filter, setFilter] = useState('ALL')

  const diplomas = data || []
  const count = (status) => diplomas.filter((d) => d.status === status).length

  const options = [
    { value: 'ALL', label: 'Tous', count: diplomas.length },
    { value: 'DRAFT', label: 'Brouillons', count: count('DRAFT') },
    { value: 'ISSUED', label: 'Émis', count: count('ISSUED') },
    { value: 'REVOKED', label: 'Révoqués', count: count('REVOKED') },
  ]

  const rows = filter === 'ALL' ? diplomas : diplomas.filter((d) => d.status === filter)

  return (
    <div className="container-fluid px-3 px-lg-4">
      <PageHeader
        title="Diplômes"
        subtitle="Consultez et suivez les diplômes de votre établissement."
        actions={
          <Link to="/etablissement/diplomes/nouveau" className="btn btn-primary">
            <FaPlus className="me-2" />
            Créer un diplôme
          </Link>
        }
      />

      {loading && <LoadingState message="Chargement des diplômes…" />}

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
          <StatusFilter options={options} value={filter} onChange={setFilter} />
          <DataTable
            key={filter}
            columns={columns}
            rows={rows}
            searchKeys={['id', 'student', 'title']}
            searchPlaceholder="Rechercher un étudiant, un diplôme ou une référence…"
            emptyMessage="Aucun diplôme ne correspond à votre recherche."
            pageSize={6}
          />
        </>
      )}
    </div>
  )
}

export default DiplomasPage