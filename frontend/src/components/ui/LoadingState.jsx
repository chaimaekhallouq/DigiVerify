function LoadingState({ message = 'Chargement en cours…' }) {
  return (
    <div className="dv-loading" role="status">
      <span className="spinner-border text-primary" aria-hidden="true" />
      <p className="text-muted mb-0 mt-3">{message}</p>
    </div>
  )
}

export default LoadingState