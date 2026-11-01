import axiosClient from './axiosClient'
import { mockStudentDiplomas } from '../mocks/studentDiplomas'
import { mockInstitutionDiplomas } from '../mocks/institutionDiplomas'

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true'

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Diplômes de l'étudiant connecté.
// Endpoint PROPOSÉ : GET /diplomas/mine
// Réponse attendue : [{ id, title, institution, issuedAt, status, verificationUrl }]
export async function getMyDiplomas() {
  if (USE_MOCKS) {
    await wait(500)
    return mockStudentDiplomas
  }

  try {
    const { data } = await axiosClient.get('/diplomas/mine')
    return data
  } catch {
    throw new Error('Impossible de charger vos diplômes. Veuillez réessayer.')
  }
}

// Télécharge le PDF officiel signé (généré par le backend).
// Endpoint PROPOSÉ : GET /diplomas/{id}/pdf  → fichier PDF (blob)
// Retourne le fichier, ou null en mode démonstration (aucun vrai PDF n'existe).
export async function downloadDiplomaPdf(id) {
  if (USE_MOCKS) {
    await wait(600)
    return null
  }

  try {
    const { data } = await axiosClient.get(`/diplomas/${id}/pdf`, { responseType: 'blob' })
    return data
  } catch {
    throw new Error('Le téléchargement a échoué. Veuillez réessayer.')
  }
}

// Diplômes de l'établissement connecté (tous statuts).
// Endpoint PROPOSÉ : GET /diplomas
// Réponse : [{ id, student, title, level, graduationDate, issuedAt, status }]
// Le backend déduit l'établissement de l'utilisateur connecté.
export async function getInstitutionDiplomas() {
  if (USE_MOCKS) {
    await wait(500)
    return mockInstitutionDiplomas
  }

  try {
    const { data } = await axiosClient.get('/diplomas')
    return data
  } catch {
    throw new Error('Impossible de charger les diplômes. Veuillez réessayer.')
  }
}