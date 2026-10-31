import { QRCodeSVG } from 'qrcode.react'

function QRCodeDisplay({ value, size = 160 }) {
  return (
    <div className="dv-qr">
      <QRCodeSVG value={value} size={size} level="M" marginSize={2} />
      <small className="text-muted d-block mt-2">
        Scannez ce code pour vérifier le diplôme.
      </small>
    </div>
  )
}

export default QRCodeDisplay