import axiosClient from './axiosClient'
import { mockRecruiterDashboard } from '../mocks/recruiterDashboard'
import { mockInstitutionDiplomas } from '../mocks/institutionDiplomas'
import { mockStudentDiplomas } from '../mocks/studentDiplomas'

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true'

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// ---------- Outils pour le mode démonstration ----------

// Historique en mémoire (disparaît au rechargement)
let history = mockRecruiterDashboard.recentVerifications.map((v) => ({ ...v }))

// Détails techniques simulés pour chaque résultat
const MOCK_DETAILS = {
  AUTHENTIC: { hashMatch: true, signatureValid: true, certificateStatus: 'VALID', revoked: false },
  MODIFIED: { hashMatch: false, signatureValid: false, certificateStatus: 'VALID', revoked: false },
  INVALID: { hashMatch: false, signatureValid: false, certificateStatus: 'UNKNOWN', revoked: false },
  REVOKED: { hashMatch: true, signatureValid: true, certificateStatus: 'VALID', revoked: true },
  UNTRUSTED: { hashMatch: true, signatureValid: true, certificateStatus: 'UNTRUSTED', revoked: false },
}

function findMockDiploma(id) {
  const inst = mockInstitutionDiplomas.find((d) => d.id === id)
  if (inst) {
    return { id: inst.id, student: inst.student, title: inst.title, institution: 'Université de Lyon', issuedAt: inst.issuedAt, status: inst.status }
  }
  const stud = mockStudentDiplomas.find((d) => d.id === id)
  if (stud) {
    return { id: stud.id, student: 'Camille Martin', title: stud.title, institution: stud.institution, issuedAt: stud.issuedAt, status: stud.status }
  }
  return null
}

function buildResult(result, diploma) {
  return {
    result,
    diploma: diploma
      ? { id: diploma.id, student: diploma.student, title: diploma.title, institution: diploma.institution, issuedAt: diploma.issuedAt }
      : null,
    details: MOCK_DETAILS[result],
    verifiedAt: new Date().toISOString(),
  }
}

function record(method, response, fallbackTitle) {
  history.unshift({
    id: `VER-${String(Date.now()).slice(-5)}`,
    diplomaId: response.diploma?.id ?? null,
    student: response.diploma?.student ?? 'Fichier inconnu',
    title: response.diploma?.title ?? fallbackTitle,
    method,
    result: response.result,
    verifiedAt: response.verifiedAt,
  })
}

// ---------- Tableau de bord ----------

// Endpoint PROPOSÉ : GET /stats/recruiter
// Réponse : { total, authentic, problems, recentVerifications: [...] }
export async function getRecruiterDashboard() {
  if (USE_MOCKS) {
    await wait(500)
    return mockRecruiterDashboard
  }

  try {
    const { data } = await axiosClient.get('/stats/recruiter')
    return data
  } catch {
    throw new Error('Impossible de charger le tableau de bord. Veuillez réessayer.')
  }
}

// ---------- Vérification ----------
// Format de réponse commun (proposé) :
// { result: 'AUTHENTIC'|'MODIFIED'|'INVALID'|'REVOKED'|'UNTRUSTED',
//   diploma: { id, student, title, institution, issuedAt } | null,
//   details: { hashMatch, signatureValid, certificateStatus, revoked },
//   verifiedAt }
// Toute la cryptographie (hash, signature, certificat) est faite par le BACKEND.

// Endpoint PROPOSÉ : GET /verify/{id}  (public, appelé depuis le QR Code)
export async function verifyById(id) {
  if (USE_MOCKS) {
    await wait(800)
    const d = findMockDiploma(id)
    let result = 'INVALID'
    if (d?.status === 'ISSUED') result = 'AUTHENTIC'
    if (d?.status === 'REVOKED') result = 'REVOKED'
    const response = buildResult(result, result === 'INVALID' ? null : d)
    record('QR_CODE', response, id)
    return response
  }

  try {
    const { data } = await axiosClient.get(`/verify/${encodeURIComponent(id)}`)
    return data
  } catch {
    throw new Error('La vérification a échoué. Veuillez réessayer.')
  }
}

// Endpoint PROPOSÉ : POST /verify/upload  (multipart/form-data, champ « file »)
// En mode démonstration, le résultat dépend du NOM du fichier :
//   « modifie » → Modifié, « revoque » → Révoqué, « inconnu » → Non fiable,
//   « invalide » → Invalide, tout autre nom → Authentique.
export async function verifyPdf(file) {
  if (USE_MOCKS) {
    await wait(1300)
    const name = file.name.toLowerCase()
    let result = 'AUTHENTIC'
    let diploma = findMockDiploma('DV-2026-0001')
    if (name.includes('modifie')) { result = 'MODIFIED'; diploma = findMockDiploma('DV-2026-0002') }
    else if (name.includes('revoque')) { result = 'REVOKED'; diploma = findMockDiploma('DV-2026-0004') }
    else if (name.includes('inconnu')) {
      result = 'UNTRUSTED'
      diploma = { id: 'DV-2025-0310', student: 'Inès Dubois', title: 'Licence en Mathématiques', institution: 'Établissement inconnu', issuedAt: '2025-06-20T10:00:00Z' }
    } else if (name.includes('invalide')) { result = 'INVALID'; diploma = null }

    const response = buildResult(result, diploma)
    record('PDF_UPLOAD', response, file.name)
    return response
  }

  try {
    const formData = new FormData()
    formData.append('file', file)
    const { data } = await axiosClient.post('/verify/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data
  } catch (err) {
    if (err.response?.status === 413) throw new Error('Le fichier est trop volumineux.')
    throw new Error('La vérification a échoué. Veuillez réessayer.')
  }
}

// Historique du recruteur connecté.
// Endpoint PROPOSÉ : GET /verifications
// Réponse : [{ id, diplomaId, student, title, method, result, verifiedAt }]
export async function getVerificationHistory() {
  if (USE_MOCKS) {
    await wait(400)
    return history.map((v) => ({ ...v }))
  }

  try {
    const { data } = await axiosClient.get('/verifications')
    return data
  } catch {
    throw new Error("Impossible de charger l'historique. Veuillez réessayer.")
  }
}