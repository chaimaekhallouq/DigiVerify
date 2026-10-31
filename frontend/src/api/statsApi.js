import axiosClient from './axiosClient'
import { mockInstitutionDashboard } from '../mocks/institutionDashboard'

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true'

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Données du tableau de bord Établissement.
// Endpoint PROPOSÉ : GET /stats/institution
// Réponse attendue : { students, issued, drafts, revoked, recentDiplomas: [...] }
// Le backend déduit l'établissement de l'utilisateur connecté.
export async function getInstitutionDashboard() {
  if (USE_MOCKS) {
    await wait(500)
    return mockInstitutionDashboard
  }

  try {
    const { data } = await axiosClient.get('/stats/institution')
    return data
  } catch {
    throw new Error('Impossible de charger les statistiques. Veuillez réessayer.')
  }
}