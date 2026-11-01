import Modal from './Modal'

function ConfirmDialog({
  title,
  confirmLabel = 'Confirmer',
  danger = false,
  busy = false,
  onConfirm,
  onCancel,
  children,
}) {
  return (
    <Modal title={title} onClose={busy ? () => {} : onCancel}>
      {children}
      <div className="d-flex justify-content-end gap-2 mt-3">
        <button type="button" className="btn btn-outline-primary" onClick={onCancel} disabled={busy}>
          Annuler
        </button>
        <button
          type="button"
          className={`btn ${danger ? 'btn-danger' : 'btn-primary'}`}
          onClick={onConfirm}
          disabled={busy}
        >
          {busy && <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />}
          {confirmLabel}
        </button>
      </div>
    </Modal>
  )
}

export default ConfirmDialog