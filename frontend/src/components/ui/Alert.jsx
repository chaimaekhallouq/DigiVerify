import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
  FaInfoCircle,
} from 'react-icons/fa'

const VARIANTS = {
  success: { icon: <FaCheckCircle />, className: 'alert-success' },
  danger: { icon: <FaTimesCircle />, className: 'alert-danger' },
  warning: { icon: <FaExclamationTriangle />, className: 'alert-warning' },
  info: { icon: <FaInfoCircle />, className: 'alert-info' },
}

function Alert({ variant = 'info', title, children, onClose }) {
  const { icon, className } = VARIANTS[variant] || VARIANTS.info

  return (
    <div className={`alert ${className} dv-alert`} role="alert">
      <span className="dv-alert__icon">{icon}</span>
      <div className="dv-alert__body">
        {title && <strong className="d-block">{title}</strong>}
        {children}
      </div>
      {onClose && (
        <button
          type="button"
          className="btn-close"
          aria-label="Fermer le message"
          onClick={onClose}
        />
      )}
    </div>
  )
}

export default Alert