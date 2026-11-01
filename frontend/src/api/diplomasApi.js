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
// Crée un diplôme en brouillon (non signé).
// Endpoint PROPOSÉ : POST /diplomas
// Requête : { studentId, title, level, graduationDate, grade? }
// Réponse : { id, student, title, level, graduationDate, issuedAt: null, status: 'DRAFT' }
export async function createDiploma(values) {
  if (USE_MOCKS) {
    await wait(700)
    const created = {
      id: `DV-2026-${String(Date.now()).slice(-4)}`,
      student: values.studentName,
      title: values.title.trim(),
      level: values.level,
      graduationDate: values.graduationDate,
      issuedAt: null,
      status: 'DRAFT',
    }
    // On l'ajoute à la liste en mémoire pour qu'il apparaisse dans « Diplômes »
    mockInstitutionDiplomas.unshift(created)
    return created
  }

  try {
    const { studentName: _studentName, ...payload } = values // le nom n'est utile qu'au mock
    const { data } = await axiosClient.post('/diplomas', payload)
    return data
  } catch (err) {
    if (err.response?.status === 422) {
      throw new Error('Les informations saisies sont invalides.')
    }
    throw new Error('Impossible de créer le diplôme. Veuillez réessayer.')
  }
}