import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
  FaBan,
  FaQuestionCircle,
  FaPen,
} from 'react-icons/fa'

// Pour chaque statut : libellé français, icône et classe CSS
const STATUS_CONFIG = {
  AUTHENTIC: { label: 'Authentique', icon: <FaCheckCircle />, tone: 'authentic' },
  MODIFIED: { label: 'Modifié', icon: <FaExclamationTriangle />, tone: 'modified' },
  INVALID: { label: 'Invalide', icon: <FaTimesCircle />, tone: 'invalid' },
  REVOKED: { label: 'Révoqué', icon: <FaBan />, tone: 'revoked' },
  UNTRUSTED: { label: 'Non fiable', icon: <FaQuestionCircle />, tone: 'untrusted' },
  DRAFT: { label: 'Brouillon', icon: <FaPen />, tone: 'draft' },
  ISSUED: { label: 'Émis', icon: <FaCheckCircle />, tone: 'authentic' },
}

function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status]

  // Si le backend envoie un statut inconnu, on l'affiche tel quel sans planter
  if (!config) {
    return <span className="dv-status dv-status--draft">{status}</span>
  }

  return (
    <span className={`dv-status dv-status--${config.tone}`}>
      {config.icon} {config.label}
    </span>
  )
}

export default StatusBadge