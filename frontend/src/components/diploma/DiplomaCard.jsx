import { useState } from 'react'
import { FaGraduationCap, FaDownload, FaQrcode } from 'react-icons/fa'
import { formatDate } from '../../utils/formatters'
import StatusBadge from '../ui/StatusBadge'
import QRCodeDisplay from './QRCodeDisplay'

function DiplomaCard({ diploma, onDownload, downloading = false }) {
  const [showQr, setShowQr] = useState(false)
  const isValid = diploma.status === 'ISSUED'

  return (
    <div className="dv-card dv-diploma">
      <div className="dv-diploma__top">
        <div className="dv-diploma__icon">
          <FaGraduationCap />
        </div>
        <StatusBadge status={diploma.status} />
      </div>

      <h3 className="h5 mb-1">{diploma.title}</h3>
      <p className="text-muted mb-3">{diploma.institution}</p>

      <dl className="dv-diploma__meta">
        <dt>Référence</dt>
        <dd>{diploma.id}</dd>
        <dt>Date d'émission</dt>
        <dd>{formatDate(diploma.issuedAt)}</dd>
      </dl>

      {!isValid && (
        <p className="small text-muted mb-3">
          Ce diplôme n'est plus valide : le téléchargement est désactivé.
        </p>
      )}

      <div className="d-flex flex-wrap gap-2">
        <button
          type="button"
          className="btn btn-primary btn-sm"
          disabled={!isValid || downloading}
          onClick={() => onDownload(diploma)}
        >
          {downloading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />
              Téléchargement…
            </>
          ) : (
            <>
              <FaDownload className="me-2" />
              Télécharger le diplôme
            </>
          )}
        </button>

        {isValid && (
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            aria-expanded={showQr}
            onClick={() => setShowQr(!showQr)}
          >
            <FaQrcode className="me-2" />
            {showQr ? 'Masquer le QR Code' : 'Afficher le QR Code'}
          </button>
        )}
      </div>

      {isValid && showQr && (
        <div className="mt-3">
          <QRCodeDisplay value={diploma.verificationUrl} />
        </div>
      )}
    </div>
  )
}

export default DiplomaCard