import { FaQrcode, FaFilePdf } from 'react-icons/fa'
import { formatDate } from '../../utils/formatters'
import StatusBadge from '../ui/StatusBadge'
import DataTable from '../ui/DataTable'

const METHOD_LABELS = {
  QR_CODE: { label: 'QR Code', icon: <FaQrcode /> },
  PDF_UPLOAD: { label: 'Fichier PDF', icon: <FaFilePdf /> },
}

const columns = [
  { key: 'verifiedAt', header: 'Date', render: (row) => formatDate(row.verifiedAt) },
  { key: 'student', header: 'Titulaire' },
  { key: 'title', header: 'Diplôme / Fichier' },
  {
    key: 'method',
    header: 'Méthode',
    render: (row) => {
      const m = METHOD_LABELS[row.method]
      return m ? (
        <span className="d-inline-flex align-items-center gap-2">
          {m.icon} {m.label}
        </span>
      ) : (
        row.method
      )
    },
  },
  { key: 'result', header: 'Résultat', render: (row) => <StatusBadge status={row.result} /> },
]

function VerificationHistoryTable({ rows, searchable = false, pageSize = 5 }) {
  return (
    <DataTable
      columns={columns}
      rows={rows}
      searchKeys={searchable ? ['student', 'title', 'diplomaId'] : []}
      searchPlaceholder="Rechercher un titulaire ou un diplôme…"
      emptyMessage="Aucune vérification pour le moment."
      pageSize={pageSize}
    />
  )
}

export default VerificationHistoryTable