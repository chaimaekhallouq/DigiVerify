import axiosClient from './axiosClient'
import { mockStudents } from '../mocks/students'

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true'

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Copie en mémoire : les modifications disparaissent au rechargement de la page
let students = mockStudents.map((s) => ({ ...s }))

// Messages d'erreur selon le code HTTP renvoyé par le backend
function toError(err, fallback) {
  if (err.response?.status === 409) {
    return new Error('Un étudiant avec cet e-mail ou ce numéro étudiant existe déjà.')
  }
  if (err.response?.status === 422) {
    return new Error('Les informations saisies sont invalides.')
  }
  return new Error(fallback)
}

// Endpoint PROPOSÉ : GET /students
// Réponse : [{ id, firstName, lastName, email, studentNumber, birthDate, diplomasCount }]
export async function getStudents() {
  if (USE_MOCKS) {
    await wait(500)
    return students.map((s) => ({ ...s }))
  }

  try {
    const { data } = await axiosClient.get('/students')
    return data
  } catch {
    throw new Error('Impossible de charger les étudiants. Veuillez réessayer.')
  }
}

// Endpoint PROPOSÉ : POST /students  { firstName, lastName, email, studentNumber, birthDate }
export async function createStudent(values) {
  if (USE_MOCKS) {
    await wait(600)
    const email = values.email.trim().toLowerCase()
    if (students.some((s) => s.email === email || s.studentNumber === values.studentNumber.trim())) {
      throw new Error('Un étudiant avec cet e-mail ou ce numéro étudiant existe déjà.')
    }
    const created = {
      id: Date.now(),
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email,
      studentNumber: values.studentNumber.trim(),
      birthDate: values.birthDate,
      diplomasCount: 0,
    }
    students = [created, ...students]
    return { ...created }
  }

  try {
    const { data } = await axiosClient.post('/students', values)
    return data
  } catch (err) {
    throw toError(err, "Impossible d'ajouter l'étudiant. Veuillez réessayer.")
  }
}

// Endpoint PROPOSÉ : PUT /students/{id}  (mêmes champs que la création)
export async function updateStudent(id, values) {
  if (USE_MOCKS) {
    await wait(600)
    const email = values.email.trim().toLowerCase()
    const duplicate = students.some(
      (s) => s.id !== id && (s.email === email || s.studentNumber === values.studentNumber.trim())
    )
    if (duplicate) {
      throw new Error('Un étudiant avec cet e-mail ou ce numéro étudiant existe déjà.')
    }
    students = students.map((s) =>
      s.id === id
        ? {
            ...s,
            firstName: values.firstName.trim(),
            lastName: values.lastName.trim(),
            email,
            studentNumber: values.studentNumber.trim(),
            birthDate: values.birthDate,
          }
        : s
    )
    return students.find((s) => s.id === id)
  }

  try {
    const { data } = await axiosClient.put(`/students/${id}`, values)
    return data
  } catch (err) {
    throw toError(err, "Impossible de modifier l'étudiant. Veuillez réessayer.")
  }
}