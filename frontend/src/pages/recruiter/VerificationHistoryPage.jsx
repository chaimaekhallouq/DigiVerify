import { useState } from 'react'
import { FaRedo } from 'react-icons/fa'
import { useFetch } from '../../hooks/useFetch'
import { getVerificationHistory } from '../../api/verificationApi'
import PageHeader from '../../components/layout/PageHeader'
import LoadingState from '../../components/ui/LoadingState'
import Alert from '../../components/ui/Alert'
import StatusFilter from '../../components/ui/StatusFilter'
import VerificationHistoryTable from '../../components/verification/VerificationHistoryTable'

const RESULT_FILTERS = [
  { value: 'ALL', label: 'Toutes' },
  { value: 'AUTHENTIC', label: 'Authentiques' },
  { value: 'MODIFIED', label: 'Modifiés' },
  { value: 'INVALID', label: 'Invalides' },
  { value: 'REVOKED', label: 'Révoqués' },
  { value: 'UNTRUSTED', label: 'Non fiables' },
]

function VerificationHistoryPage() {
  const { data, loading, error, reload } = useFetch(getVerificationHistory)
  const [filter, setFilter] = useState('ALL')

  const all = data || []
  const options = RESULT_FILTERS.map((f) => ({
    ...f,
    count: f.value === 'ALL' ? all.length : all.filter((v) => v.result === f.value).length,
  }))
  const rows = filter === 'ALL' ? all : all.filter((v) => v.result === filter)

  return (
    <div className="container-fluid px-3 px-lg-4">
      <PageHeader
        title="Historique des vérifications"
        subtitle="Retrouvez toutes les vérifications que vous avez effectuées."
      />

      {loading && <LoadingState message="Chargement de l'historique…" />}

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
          <VerificationHistoryTable key={filter} rows={rows} searchable pageSize={8} />
        </>
      )}
    </div>
  )
}

export default VerificationHistoryPage