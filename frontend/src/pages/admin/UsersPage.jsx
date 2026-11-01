import { useState } from 'react'
import { FaBan, FaCheck, FaRedo } from 'react-icons/fa'
import { useFetch } from '../../hooks/useFetch'
import { useAuth } from '../../hooks/useAuth'
import { getUsers, setUserStatus } from '../../api/usersApi'
import { ROLES, ROLE_LABELS } from '../../utils/constants'
import { formatDate } from '../../utils/formatters'
import PageHeader from '../../components/layout/PageHeader'
import LoadingState from '../../components/ui/LoadingState'
import Alert from '../../components/ui/Alert'
import DataTable from '../../components/ui/DataTable'
import StatusBadge from '../../components/ui/StatusBadge'
import StatusFilter from '../../components/ui/StatusFilter'
import ConfirmDialog from '../../components/ui/ConfirmDialog'

function UsersPage() {
  const { user: me } = useAuth()
  const { data, loading, error, reload } = useFetch(getUsers)
  const [filter, setFilter] = useState('ALL')
  const [target, setTarget] = useState(null)
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState(null)

  const all = data || []
  const options = [
    { value: 'ALL', label: 'Tous', count: all.length },
    ...Object.values(ROLES).map((role) => ({
      value: role,
      label: ROLE_LABELS[role],
      count: all.filter((u) => u.role === role).length,
    })),
  ]
  const rows = filter === 'ALL' ? all : all.filter((u) => u.role === filter)

  const handleToggle = async () => {
    const newStatus = target.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE'
    setBusy(true)
    try {
      await setUserStatus(target.id, newStatus)
      setNotice({
        variant: 'success',
        message: newStatus === 'SUSPENDED' ? 'Le compte a été suspendu.' : 'Le compte a été réactivé.',
      })
      reload()
    } catch (err) {
      setNotice({ variant: 'danger', message: err.message })
    } finally {
      setBusy(false)
      setTarget(null)
    }
  }

  const columns = [
    { key: 'name', header: 'Nom' },
    { key: 'email', header: 'E-mail' },
    { key: 'role', header: 'Rôle', render: (r) => ROLE_LABELS[r.role] || r.role },
    { key: 'createdAt', header: 'Inscrit le', render: (r) => formatDate(r.createdAt) },
    { key: 'status', header: 'Statut', render: (r) => <StatusBadge status={r.status} /> },
    {
      key: 'actions',
      header: 'Actions',
      render: (r) => (
        <button
          type="button"
          className="btn btn-outline-primary btn-sm"
          disabled={r.email === me.email} // on ne peut pas suspendre son propre compte
          title={r.email === me.email ? 'Vous ne pouvez pas modifier votre propre compte' : undefined}
          onClick={() => setTarget(r)}
        >
          {r.status === 'ACTIVE' ? <FaBan className="me-2" /> : <FaCheck className="me-2" />}
          {r.status === 'ACTIVE' ? 'Suspendre' : 'Réactiver'}
        </button>
      ),
    },
  ]

  return (
    <div className="container-fluid px-3 px-lg-4">
      <PageHeader title="Utilisateurs" subtitle="Gérez les comptes et leurs autorisations." />

      {notice && (
        <Alert variant={notice.variant} onClose={() => setNotice(null)}>
          {notice.message}
        </Alert>
      )}

      {loading && !data && <LoadingState message="Chargement des utilisateurs…" />}

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
            searchKeys={['name', 'email']}
            searchPlaceholder="Rechercher un nom ou un e-mail…"
            emptyMessage="Aucun utilisateur ne correspond à votre recherche."
            pageSize={6}
          />
        </>
      )}

      {target && (
        <ConfirmDialog
          title={target.status === 'ACTIVE' ? 'Suspendre le compte' : 'Réactiver le compte'}
          confirmLabel={target.status === 'ACTIVE' ? 'Suspendre' : 'Réactiver'}
          danger={target.status === 'ACTIVE'}
          busy={busy}
          onConfirm={handleToggle}
          onCancel={() => setTarget(null)}
        >
          <p className="mb-0">
            {target.status === 'ACTIVE'
              ? `« ${target.name} » ne pourra plus se connecter.`
              : `« ${target.name} » pourra de nouveau se connecter.`}
          </p>
        </ConfirmDialog>
      )}
    </div>
  )
}

export default UsersPage