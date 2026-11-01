import { useState } from 'react'
import { FaPlus, FaPause, FaPlay, FaRedo, FaSave } from 'react-icons/fa'
import { useFetch } from '../../hooks/useFetch'
import { getInstitutions, createInstitution, setInstitutionStatus } from '../../api/institutionsApi'
import { formatDate } from '../../utils/formatters'
import { EMAIL_REGEX } from '../../utils/validators'
import PageHeader from '../../components/layout/PageHeader'
import LoadingState from '../../components/ui/LoadingState'
import Alert from '../../components/ui/Alert'
import DataTable from '../../components/ui/DataTable'
import StatusBadge from '../../components/ui/StatusBadge'
import Modal from '../../components/ui/Modal'
import FormField from '../../components/ui/FormField'
import ConfirmDialog from '../../components/ui/ConfirmDialog'

function InstitutionsPage() {
  const { data, loading, error, reload } = useFetch(getInstitutions)

  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', city: '', contactEmail: '' })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [saving, setSaving] = useState(false)
  const [target, setTarget] = useState(null) // établissement à suspendre / réactiver
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState(null)

  const openForm = () => {
    setForm({ name: '', city: '', contactEmail: '' })
    setErrors({})
    setServerError('')
    setShowForm(true)
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleCreate = async (e) => {
    e.preventDefault()
    const newErrors = {}
    if (form.name.trim().length < 3) newErrors.name = "Le nom de l'établissement est obligatoire (3 caractères minimum)."
    if (!form.city.trim()) newErrors.city = 'La ville est obligatoire.'
    if (!form.contactEmail.trim()) newErrors.contactEmail = "L'adresse e-mail de contact est obligatoire."
    else if (!EMAIL_REGEX.test(form.contactEmail.trim())) newErrors.contactEmail = 'Veuillez saisir une adresse e-mail valide.'
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setSaving(true)
    setServerError('')
    try {
      await createInstitution(form)
      setShowForm(false)
      setNotice({ variant: 'success', message: "L'établissement a été créé et son certificat a été généré." })
      reload()
    } catch (err) {
      setServerError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleToggle = async () => {
    const newStatus = target.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE'
    setBusy(true)
    try {
      await setInstitutionStatus(target.id, newStatus)
      setNotice({
        variant: 'success',
        message: newStatus === 'SUSPENDED' ? "L'établissement a été suspendu." : "L'établissement a été réactivé.",
      })
      reload()
    } catch (err) {
      setNotice({ variant: 'danger', message: err.message })
    } finally {
      setBusy(false)
      setTarget(null)
    }
  }

  const columns = [
    { key: 'name', header: 'Établissement' },
    { key: 'city', header: 'Ville' },
    { key: 'contactEmail', header: 'Contact' },
    { key: 'diplomasIssued', header: 'Diplômes émis' },
    { key: 'certificateExpiresAt', header: 'Certificat jusqu’au', render: (r) => formatDate(r.certificateExpiresAt) },
    { key: 'status', header: 'Statut', render: (r) => <StatusBadge status={r.status} /> },
    {
      key: 'actions',
      header: 'Actions',
      render: (r) => (
        <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => setTarget(r)}>
          {r.status === 'ACTIVE' ? <FaPause className="me-2" /> : <FaPlay className="me-2" />}
          {r.status === 'ACTIVE' ? 'Suspendre' : 'Réactiver'}
        </button>
      ),
    },
  ]

  return (
    <div className="container-fluid px-3 px-lg-4">
      <PageHeader
        title="Établissements"
        subtitle="Gérez les établissements autorisés à émettre des diplômes."
        actions={
          <button type="button" className="btn btn-primary" onClick={openForm}>
            <FaPlus className="me-2" />
            Ajouter un établissement
          </button>
        }
      />

      {notice && (
        <Alert variant={notice.variant} onClose={() => setNotice(null)}>
          {notice.message}
        </Alert>
      )}

      {loading && !data && <LoadingState message="Chargement des établissements…" />}

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
          rows={data}
          searchKeys={['name', 'city', 'contactEmail']}
          searchPlaceholder="Rechercher un établissement ou une ville…"
          emptyMessage="Aucun établissement ne correspond à votre recherche."
          pageSize={6}
        />
      )}

      {showForm && (
        <Modal title="Ajouter un établissement" onClose={() => setShowForm(false)}>
          <form onSubmit={handleCreate} noValidate>
            {serverError && (
              <Alert variant="danger" title="Création impossible">
                {serverError}
              </Alert>
            )}
            <FormField id="name" name="name" label="Nom de l'établissement" required
              value={form.name} onChange={handleChange} error={errors.name} />
            <FormField id="city" name="city" label="Ville" required
              value={form.city} onChange={handleChange} error={errors.city} />
            <FormField id="contactEmail" name="contactEmail" type="email" label="E-mail de contact" required
              value={form.contactEmail} onChange={handleChange} error={errors.contactEmail} />
            <Alert variant="info">
              Le serveur génère automatiquement la paire de clés et le certificat X.509 de
              l'établissement.
            </Alert>
            <div className="d-flex justify-content-end gap-2">
              <button type="button" className="btn btn-outline-primary" onClick={() => setShowForm(false)} disabled={saving}>
                Annuler
              </button>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />
                    Création…
                  </>
                ) : (
                  <>
                    <FaSave className="me-2" />
                    Créer
                  </>
                )}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {target && (
        <ConfirmDialog
          title={target.status === 'ACTIVE' ? "Suspendre l'établissement" : "Réactiver l'établissement"}
          confirmLabel={target.status === 'ACTIVE' ? 'Suspendre' : 'Réactiver'}
          danger={target.status === 'ACTIVE'}
          busy={busy}
          onConfirm={handleToggle}
          onCancel={() => setTarget(null)}
        >
          <p className="mb-0">
            {target.status === 'ACTIVE'
              ? `« ${target.name} » ne pourra plus émettre de diplômes tant qu'il est suspendu.`
              : `« ${target.name} » pourra de nouveau émettre des diplômes.`}
          </p>
        </ConfirmDialog>
      )}
    </div>
  )
}

export default InstitutionsPage