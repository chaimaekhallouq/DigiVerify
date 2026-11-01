import { useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'

function Modal({ title, onClose, children }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden' // empêche de faire défiler la page derrière
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="dv-modal__overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="dv-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="dv-modal__header">
          <h2 id="modal-title" className="h5 mb-0">{title}</h2>
          <button type="button" className="btn-close" aria-label="Fermer" onClick={onClose}>
            <span className="visually-hidden">Fermer</span>
          </button>
        </div>
        <div className="dv-modal__body">{children}</div>
      </div>
    </div>
  )
}

export default Modal