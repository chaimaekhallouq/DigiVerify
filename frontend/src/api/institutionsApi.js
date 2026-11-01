import axiosClient from './axiosClient'
import { mockInstitutions, mockMyInstitution } from '../mocks/institutions'

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true'
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

let institutions = mockInstitutions.map((i) => ({ ...i }))

// Endpoint PROPOSÉ : GET /institutions/me  (établissement connecté + son certificat)
export async function getMyInstitution() {
  if (USE_MOCKS) {
    await wait(400)
    return mockMyInstitution
  }
  try {
    const { data } = await axiosClient.get('/institutions/me')
    return data
  } catch {
    throw new Error("Impossible de charger les informations de l'établissement.")
  }
}

// Endpoint PROPOSÉ : GET /institutions  (administrateur)
export async function getInstitutions() {
  if (USE_MOCKS) {
    await wait(500)
    return institutions.map((i) => ({ ...i }))
  }
  try {
    const { data } = await axiosClient.get('/institutions')
    return data
  } catch {
    throw new Error('Impossible de charger les établissements. Veuillez réessayer.')
  }
}

// Endpoint PROPOSÉ : POST /institutions  { name, city, contactEmail }
// Le BACKEND génère la paire de clés et le certificat X.509 de l'établissement.
export async function createInstitution(values) {
  if (USE_MOCKS) {
    await wait(800)
    if (institutions.some((i) => i.name.toLowerCase() === values.name.trim().toLowerCase())) {
      throw new Error('Un établissement portant ce nom existe déjà.')
    }
    const expires = new Date()
    expires.setFullYear(expires.getFullYear() + 2)
    const created = {
      id: Date.now(),
      name: values.name.trim(),
      city: values.city.trim(),
      contactEmail: values.contactEmail.trim(),
      diplomasIssued: 0,
      certificateExpiresAt: expires.toISOString(),
      status: 'ACTIVE',
    }
    institutions = [created, ...institutions]
    return created
  }
  try {
    const { data } = await axiosClient.post('/institutions', values)
    return data
  } catch (err) {
    if (err.response?.status === 409) throw new Error('Un établissement portant ce nom existe déjà.')
    throw new Error("Impossible de créer l'établissement. Veuillez réessayer.")
  }
}

// Endpoint PROPOSÉ : PATCH /institutions/{id}/status  { status: 'ACTIVE' | 'SUSPENDED' }
export async function setInstitutionStatus(id, status) {
  if (USE_MOCKS) {
    await wait(500)
    institutions = institutions.map((i) => (i.id === id ? { ...i, status } : i))
    return institutions.find((i) => i.id === id)
  }
  try {
    const { data } = await axiosClient.patch(`/institutions/${id}/status`, { status })
    return data
  } catch {
    throw new Error('La modification du statut a échoué. Veuillez réessayer.')
  }
}