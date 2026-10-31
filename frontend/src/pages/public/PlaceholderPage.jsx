import { FaTools } from 'react-icons/fa'

function PlaceholderPage({ title }) {
  return (
    <div className="container py-5">
      <div className="dv-card p-5 text-center mx-auto" style={{ maxWidth: 560 }}>
        <FaTools size={36} className="text-primary mb-3" />
        <h1 className="h3">{title}</h1>
        <p className="text-muted mb-0">
          Cette page sera construite dans une prochaine étape.
        </p>
      </div>
    </div>
  )
}

export default PlaceholderPage