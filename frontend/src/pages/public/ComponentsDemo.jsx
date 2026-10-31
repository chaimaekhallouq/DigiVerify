import { useState } from 'react'
import { FaUserGraduate, FaFileSignature, FaBan, FaSearch } from 'react-icons/fa'
import StatusBadge from '../../components/ui/StatusBadge'
import Alert from '../../components/ui/Alert'
import FormField from '../../components/ui/FormField'
import StatCard from '../../components/ui/StatCard'
import DataTable from '../../components/ui/DataTable'
import { mockDiplomas } from '../../mocks/diplomas'
import { formatDate } from '../../utils/formatters'

const diplomaColumns = [
  { key: 'id', header: 'Référence' },
  { key: 'student', header: 'Étudiant' },
  { key: 'title', header: 'Diplôme' },
  { key: 'issuedAt', header: "Date d'émission", render: (row) => formatDate(row.issuedAt) },
  { key: 'status', header: 'Statut', render: (row) => <StatusBadge status={row.status} /> },
]

function ComponentsDemo() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [showAlert, setShowAlert] = useState(true)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.includes('@')) {
      setError('Veuillez saisir une adresse e-mail valide.')
    } else {
      setError('')
      alert('Formulaire valide !')
    }
  }

  return (
    <div className="container py-5">
      <h1 className="h3 mb-4">Démonstration des composants</h1>

      <h2 className="h5 mb-3">Cartes de statistiques</h2>
      <div className="row g-3 mb-5">
        <div className="col-12 col-sm-6 col-lg-3">
          <StatCard icon={<FaUserGraduate />} label="Étudiants" value="1 248" />
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <StatCard icon={<FaFileSignature />} label="Diplômes émis" value="934" tone="success" />
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <StatCard icon={<FaSearch />} label="Vérifications" value="2 507" tone="warning" />
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <StatCard icon={<FaBan />} label="Diplômes révoqués" value="7" tone="danger" />
        </div>
      </div>

      <h2 className="h5 mb-3">Badges de statut</h2>
      <div className="d-flex flex-wrap gap-2 mb-5">
        {['AUTHENTIC', 'MODIFIED', 'INVALID', 'REVOKED', 'UNTRUSTED', 'DRAFT', 'ISSUED'].map((s) => (
          <StatusBadge key={s} status={s} />
        ))}
      </div>

      <h2 className="h5 mb-3">Alertes</h2>
      <div className="mb-5">
        <Alert variant="success" title="Diplôme émis">
          Le diplôme de Camille Martin a été signé avec succès.
        </Alert>
        <Alert variant="danger" title="Échec de la vérification">
          Le fichier a été modifié après sa signature.
        </Alert>
        <Alert variant="warning">Le certificat de l'établissement expire dans 15 jours.</Alert>
        {showAlert && (
          <Alert variant="info" onClose={() => setShowAlert(false)}>
            Cette alerte peut être fermée avec la croix.
          </Alert>
        )}
      </div>

      <h2 className="h5 mb-3">Champ de formulaire</h2>
      <form onSubmit={handleSubmit} className="dv-card p-4" style={{ maxWidth: 480 }} noValidate>
        <FormField
          id="email"
          label="Adresse e-mail"
          type="email"
          placeholder="prenom.nom@exemple.fr"
          helpText="Nous ne partagerons jamais votre adresse."
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
        />
        <button type="submit" className="btn btn-primary">Valider</button>
      </form>

      <h2 className="h5 mb-3 mt-5">Tableau de diplômes</h2>
      <DataTable
        columns={diplomaColumns}
        rows={mockDiplomas}
        searchKeys={['id', 'student', 'title']}
        searchPlaceholder="Rechercher un étudiant ou un diplôme…"
        emptyMessage="Aucun diplôme ne correspond à votre recherche."
        pageSize={5}
      />
    </div>
  )
}

export default ComponentsDemo