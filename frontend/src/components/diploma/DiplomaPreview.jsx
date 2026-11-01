import { QRCodeSVG } from 'qrcode.react'
import { FaShieldAlt } from 'react-icons/fa'
import { formatDate } from '../../utils/formatters'

// Modèle HTML du diplôme. Le PDF OFFICIEL signé est produit par le backend :
// ceci est l'aperçu à l'écran, et la maquette de mise en page à partager avec le backend.
function DiplomaPreview({ diploma }) {
  const isIssued = diploma.status === 'ISSUED'
  const isRevoked = diploma.status === 'REVOKED'

  return (
    <div className="dv-certificate">
      {!isIssued && (
        <div className="dv-certificate__stamp">{isRevoked ? 'RÉVOQUÉ' : 'APERÇU – NON SIGNÉ'}</div>
      )}
      <div className="dv-certificate__inner">
        <FaShieldAlt size={34} className="dv-certificate__logo" />
        <p className="dv-certificate__institution">{diploma.institution}</p>
        <h2 className="dv-certificate__title">DIPLÔME</h2>

        <p className="dv-certificate__text">Il est certifié que</p>
        <p className="dv-certificate__name">{diploma.student}</p>
        <p className="dv-certificate__text">a obtenu le diplôme de</p>
        <p className="dv-certificate__degree">{diploma.title}</p>
        <p className="dv-certificate__text">
          Niveau {diploma.level} – obtenu le {formatDate(diploma.graduationDate)}
        </p>

        <div className="dv-certificate__footer">
          <div>
            <div>Référence : {diploma.id}</div>
            <div>Émis le : {formatDate(diploma.issuedAt)}</div>
          </div>
          {diploma.verificationUrl && (
            <QRCodeSVG value={diploma.verificationUrl} size={84} level="M" marginSize={1} />
          )}
        </div>
      </div>
    </div>
  )
}

export default DiplomaPreview