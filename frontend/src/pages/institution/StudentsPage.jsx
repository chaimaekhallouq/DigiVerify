import { useState } from 'react'
import { FaPlus, FaEdit, FaRedo } from 'react-icons/fa'
import { useFetch } from '../../hooks/useFetch'
import { getStudents, createStudent, updateStudent } from '../../api/studentsApi'
import { formatDate } from '../../utils/formatters'
import PageHeader from '../../components/layout/PageHeader'
import LoadingState from '../../components/ui/LoadingState'
import Alert from '../../components/ui/Alert'
import DataTable from '../../components/ui/DataTable'
import Modal from '../../components/ui/Modal'
import StudentForm from '../../components/ui/StudentForm'

function StudentsPage() {
  const { data, loading, error, reload } = useFetch(getStudents)

  // null = modale fermée ; { student: null } = ajout ; { student: {...} } = modification
  const [formState, setFormState] = useState(null)
  const [saving, setSaving] = useState(false)
  const [serverError, setServerError] = useState('')
  const [notice, setNotice] = useState('')

  const closeForm = () => {
    setFormState(null)
    setServerError('')
  }

  const handleSubmit = async (values) => {
    setSaving(true)
    setServerError('')
    try {
      if (formState.student) {
        await updateStudent(formState.student.id, values)
        setNotice("L'étudiant a été modifié avec succès.")
      } else {
        await createStudent(values)
        setNotice("L'étudiant a été ajouté avec succès.")
      }
      closeForm()
      reload()
    } catch (err) {
      setServerError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const columns = [
    { key: 'studentNumber', header: 'N° étudiant' },
    { key: 'fullName', header: 'Nom' },
    { key: 'email', header: 'E-mail' },
    { key: 'birthDate', header: 'Date de naissance', render: (row) => formatDate(row.birthDate) },
    { key: 'diplomasCount', header: 'Diplômes' },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <button
          type="button"
          className="btn btn-outline-primary btn-sm"
          onClick={() => setFormState({ student: row })}
        >
          <FaEdit className="me-2" />
          Modifier
        </button>
      ),
    },
  ]

  // Ajoute une colonne « nom complet » pour pouvoir la rechercher
  const rows = (data || []).map((s) => ({ ...s, fullName: `${s.firstName} ${s.lastName}` }))

  return (
    <div className="container-fluid px-3 px-lg-4">
      <PageHeader
        title="Étudiants"
        subtitle="Gérez les étudiants de votre établissement."
        actions={
          <button type="button" className="btn btn-primary" onClick={() => setFormState({ student: null })}>
            <FaPlus className="me-2" />
            Ajouter un étudiant
          </button>
        }
      />

      {notice && (
        <Alert variant="success" onClose={() => setNotice('')}>
          {notice}
        </Alert>
      )}

      {loading && !data && <LoadingState message="Chargement des étudiants…" />}

      {error && (
        <Alert variant="danger" title="Erreur de chargement">
          <p className="mb-2">{error}</p>
          <button type="button" className="btn btn-outline-primary btn-sm" onClick={reload}>
            <FaRedo className="me-2" />
            Réessayer
          </button>
        </Alert>
      )}

      {data && (
        <DataTable
          columns={columns}
          rows={rows}
          searchKeys={['fullName', 'email', 'studentNumber']}
          searchPlaceholder="Rechercher un nom, un e-mail ou un numéro…"
          emptyMessage="Aucun étudiant ne correspond à votre recherche."
          pageSize={6}
        />
      )}

      {formState && (
        <Modal
          title={formState.student ? "Modifier l'étudiant" : 'Ajouter un étudiant'}
          onClose={closeForm}
        >
          <StudentForm
            initial={formState.student}
            onSubmit={handleSubmit}
            onCancel={closeForm}
            saving={saving}
            serverError={serverError}
          />
        </Modal>
      )}
    </div>
  )
}

export default StudentsPage