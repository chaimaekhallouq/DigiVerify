import { useState } from 'react'
import { FaSave } from 'react-icons/fa'
import { EMAIL_REGEX } from '../../utils/validators'
import FormField from './FormField'
import Alert from './Alert'

const EMPTY = { firstName: '', lastName: '', email: '', studentNumber: '', birthDate: '' }

function StudentForm({ initial, onSubmit, onCancel, saving, serverError }) {
  const [form, setForm] = useState(initial ? { ...EMPTY, ...initial } : EMPTY)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const validate = () => {
    const e = {}
    if (form.firstName.trim().length < 2) e.firstName = 'Le prénom est obligatoire (2 caractères minimum).'
    if (form.lastName.trim().length < 2) e.lastName = 'Le nom est obligatoire (2 caractères minimum).'
    if (!form.email.trim()) e.email = "L'adresse e-mail est obligatoire."
    else if (!EMAIL_REGEX.test(form.email.trim())) e.email = 'Veuillez saisir une adresse e-mail valide.'
    if (!form.studentNumber.trim()) e.studentNumber = 'Le numéro étudiant est obligatoire.'
    if (!form.birthDate) e.birthDate = 'La date de naissance est obligatoire.'
    else if (new Date(form.birthDate) > new Date()) e.birthDate = 'La date de naissance ne peut pas être dans le futur.'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validate()
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {serverError && (
        <Alert variant="danger" title="Enregistrement impossible">
          {serverError}
        </Alert>
      )}

      <div className="row">
        <div className="col-12 col-sm-6">
          <FormField id="firstName" name="firstName" label="Prénom" required
            value={form.firstName} onChange={handleChange} error={errors.firstName} />
        </div>
        <div className="col-12 col-sm-6">
          <FormField id="lastName" name="lastName" label="Nom" required
            value={form.lastName} onChange={handleChange} error={errors.lastName} />
        </div>
      </div>

      <FormField id="email" name="email" type="email" label="Adresse e-mail" required
        placeholder="prenom.nom@univ-exemple.fr"
        value={form.email} onChange={handleChange} error={errors.email} />

      <div className="row">
        <div className="col-12 col-sm-6">
          <FormField id="studentNumber" name="studentNumber" label="Numéro étudiant" required
            value={form.studentNumber} onChange={handleChange} error={errors.studentNumber} />
        </div>
        <div className="col-12 col-sm-6">
          <FormField id="birthDate" name="birthDate" type="date" label="Date de naissance" required
            value={form.birthDate} onChange={handleChange} error={errors.birthDate} />
        </div>
      </div>

      <div className="d-flex justify-content-end gap-2 mt-2">
        <button type="button" className="btn btn-outline-primary" onClick={onCancel} disabled={saving}>
          Annuler
        </button>
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />
              Enregistrement…
            </>
          ) : (
            <>
              <FaSave className="me-2" />
              Enregistrer
            </>
          )}
        </button>
      </div>
    </form>
  )
}

export default StudentForm