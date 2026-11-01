import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
  FaBan,
  FaQuestionCircle,
} from 'react-icons/fa'
import { formatDate } from '../../utils/formatters'

const CONFIG = {
  AUTHENTIC: {
    tone: 'authentic',
    icon: <FaCheckCircle />,
    title: 'Diplôme authentique',
    text: "Le document est intact et sa signature numérique est valide. Il a bien été émis par l'établissement indiqué.",
  },
  MODIFIED: {
    tone: 'modified',
    icon: <FaExclamationTriangle />,
    title: 'Document modifié',
    text: "Le contenu du document ne correspond plus à celui qui a été signé : il a été altéré après son émission. Ne lui accordez aucune confiance.",
  },
  INVALID: {
    tone: 'invalid',
    icon: <FaTimesCircle />,
    title: 'Diplôme invalide',
    text: "Aucune signature valide n'a été trouvée. Le document est falsifié, corrompu ou ne provient pas de DigiVerify.",
  },
  REVOKED: {
    tone: 'revoked',
    icon: <FaBan />,
    title: 'Diplôme révoqué',
    text: "Ce diplôme a bien été émis, mais l'établissement l'a annulé. Il n'est plus valable.",
  },
  UNTRUSTED: {
    tone: 'untrusted',
    icon: <FaQuestionCircle />,
    title: 'Établissement non fiable',
    text: "La signature est correcte, mais le certificat de l'établissement n'est pas reconnu comme fiable (expiré, suspendu ou inconnu).",
  },
}

const CERT_LABELS = { VALID: 'Valide', UNTRUSTED: 'Non fiable', UNKNOWN: 'Inconnu' }

function Check({ ok, label, value }) {
  return (
    <li>
      <span className={ok ? 'text-success' : 'text-danger'} aria-hidden="true">
        {ok ? <FaCheckCircle /> : <FaTimesCircle />}
      </span>
      <span className="flex-grow-1">{label}</span>
      <strong>{value}</strong>
    </li>
  )
}

function VerificationResult({ response }) {
  // Résultat inconnu du frontend : on l'affiche comme invalide par prudence
  const config = CONFIG[response.result] || CONFIG.INVALID
  const { diploma, details } = response

  return (
    <div>
      <div className={`dv-result dv-result--${config.tone}`} role="status">
        <div className="dv-result__icon" aria-hidden="true">{config.icon}</div>
        <div>
          <h2 className="dv-result__title">{config.title}</h2>
          <p className="mb-0">{config.text}</p>
        </div>
      </div>

      <div className="row g-3 mt-1">
        {diploma && (
          <div className="col-12 col-md-6">
            <div className="dv-card p-4 h-100">
              <h3 className="h6 mb-3">Diplôme concerné</h3>
              <dl className="dv-diploma__meta mb-0">
                <dt>Titulaire</dt>
                <dd>{diploma.student}</dd>
                <dt>Diplôme</dt>
                <dd>{diploma.title}</dd>
                <dt>Établissement</dt>
                <dd>{diploma.institution}</dd>
                <dt>Émis le</dt>
                <dd>{formatDate(diploma.issuedAt)}</dd>
                <dt>Référence</dt>
                <dd>{diploma.id}</dd>
              </dl>
            </div>
          </div>
        )}

        {details && (
          <div className={diploma ? 'col-12 col-md-6' : 'col-12'}>
            <div className="dv-card p-4 h-100">
              <h3 className="h6 mb-2">Contrôles effectués</h3>
              <ul className="dv-checks">
                <Check ok={details.hashMatch} label="Intégrité du document" value={details.hashMatch ? 'Intact' : 'Altéré'} />
                <Check ok={details.signatureValid} label="Signature numérique" value={details.signatureValid ? 'Valide' : 'Invalide'} />
                <Check
                  ok={details.certificateStatus === 'VALID'}
                  label="Certificat de l'établissement"
                  value={CERT_LABELS[details.certificateStatus] || details.certificateStatus}
                />
                <Check ok={!details.revoked} label="Statut du diplôme" value={details.revoked ? 'Révoqué' : 'Non révoqué'} />
              </ul>
            </div>
          </div>
        )}
      </div>

      <p className="text-muted small mt-3 mb-0">
        Vérification effectuée le {formatDate(response.verifiedAt)}.
      </p>
    </div>
  )
}

export default VerificationResult