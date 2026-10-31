import axiosClient from './axiosClient'
import { mockRecruiterDashboard } from '../mocks/recruiterDashboard'

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true'

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Données du tableau de bord Recruteur.
// Endpoint PROPOSÉ : GET /stats/recruiter
// Réponse attendue : { total, authentic, problems, recentVerifications: [...] }
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