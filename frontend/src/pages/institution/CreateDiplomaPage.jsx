import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaRedo } from 'react-icons/fa'
import { useFetch } from '../../hooks/useFetch'
import { getStudents } from '../../api/studentsApi'
import { createDiploma } from '../../api/diplomasApi'
import PageHeader from '../../components/layout/PageHeader'
import LoadingState from '../../components/ui/LoadingState'
import Alert from '../../components/ui/Alert'
import DiplomaForm from '../../components/diploma/DiplomaForm'

function CreateDiplomaPage() {
  const navigate = useNavigate()
  const { data: students, loading, error, reload } = useFetch(getStudents)
  const [saving, setSaving] = useState(false)
  const [serverError, setServerError] = useState('')

  const handleSubmit = async (values) => {
    setSaving(true)
    setServerError('')
    try {
      await createDiploma(values)
      navigate('/etablissement/diplomes')
    } catch (err) {
      setServerError(err.message)
      setSaving(false)
    }
  }

  return (
    <div className="container-fluid px-3 px-lg-4">
      <PageHeader
        title="Créer un diplôme"
        subtitle="Renseignez les informations du diplôme à émettre."
      />

      {loading && <LoadingState message="Chargement des étudiants…" />}

      {error && (
        <Alert variant="danger" title="Erreur de chargement">
          <p className="mb-2">{error}</p>
          <button type="button" className="btn btn-outline-primary btn-sm" onClick={reload}>
            <FaRedo className="me-2" />
            Réessayer
          </button>
        </Alert>
      )}

      {students && (
        <div className="dv-card p-4" style={{ maxWidth: 720 }}>
          {students.length === 0 ? (
            <Alert variant="warning" title="Aucun étudiant">
              Ajoutez d'abord un étudiant dans la rubrique « Étudiants » avant de créer un diplôme.
            </Alert>
          ) : (
            <DiplomaForm
              students={students}
              onSubmit={handleSubmit}
              onCancel={() => navigate('/etablissement/diplomes')}
              saving={saving}
              serverError={serverError}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default CreateDiplomaPage