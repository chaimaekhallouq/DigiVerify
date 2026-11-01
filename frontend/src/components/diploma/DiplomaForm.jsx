import { useState } from 'react'
import { FaSave } from 'react-icons/fa'
import { DIPLOMA_LEVELS } from '../../utils/constants'
import FormField from '../ui/FormField'
import Alert from '../ui/Alert'

function DiplomaForm({ students, onSubmit, onCancel, saving, serverError }) {
  const [form, setForm] = useState({
    studentId: '',
    title: '',
    level: DIPLOMA_LEVELS[0],
    graduationDate: '',
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const validate = () => {
    const e = {}
    if (!form.studentId) e.studentId = 'Veuillez sélectionner un étudiant.'
    if (form.title.trim().length < 3) e.title = "L'intitulé est obligatoire (3 caractères minimum)."
    if (!form.graduationDate) e.graduationDate = "La date d'obtention est obligatoire."
    else if (new Date(form.graduationDate) > new Date()) {
      e.graduationDate = "La date d'obtention ne peut pas être dans le futur."
    }
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validate()
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    const student = students.find((s) => String(s.id) === form.studentId)
    onSubmit({
      studentId: Number(form.studentId),
      studentName: `${student.firstName} ${student.lastName}`,
      title: form.title,
      level: form.level,
      graduationDate: form.graduationDate,
    })
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {serverError && (
        <Alert variant="danger" title="Création impossible">
          {serverError}
        </Alert>
      )}

      <div className="mb-3">
        <label htmlFor="studentId" className="form-label">
          Étudiant <span className="text-danger">*</span>
        </label>
        <select
          id="studentId"
          name="studentId"
          className={`form-select ${errors.studentId ? 'is-invalid' : ''}`}
          value={form.studentId}
          onChange={handleChange}
          aria-invalid={errors.studentId ? 'true' : 'false'}
        >
          <option value="">— Sélectionner un étudiant —</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.lastName.toUpperCase()} {s.firstName} ({s.studentNumber})
            </option>
          ))}
        </select>
        {errors.studentId && <div className="invalid-feedback">{errors.studentId}</div>}
      </div>

      <FormField
        id="title"
        name="title"
        label="Intitulé du diplôme"
        placeholder="Licence en Informatique"
        required
        value={form.title}
        onChange={handleChange}
        error={errors.title}
      />

      <div className="row">
        <div className="col-12 col-sm-6">
          <div className="mb-3">
            <label htmlFor="level" className="form-label">
              Niveau <span className="text-danger">*</span>
            </label>
            <select
              id="level"
              name="level"
              className="form-select"
              value={form.level}
              onChange={handleChange}
            >
              {DIPLOMA_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-12 col-sm-6">
          <FormField
            id="graduationDate"
            name="graduationDate"
            type="date"
            label="Date d'obtention"
            required
            value={form.graduationDate}
            onChange={handleChange}
            error={errors.graduationDate}
          />
        </div>
      </div>

      <Alert variant="info">
        Le diplôme sera enregistré en <strong>brouillon</strong>. Il ne sera signé et émis qu'après
        votre validation, depuis la liste des diplômes.
      </Alert>

      <div className="d-flex justify-content-end gap-2">
        <button type="button" className="btn btn-outline-primary" onClick={onCancel} disabled={saving}>
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
              Créer le brouillon
            </>
          )}
        </button>
      </div>
    </form>
  )
}

export default DiplomaForm