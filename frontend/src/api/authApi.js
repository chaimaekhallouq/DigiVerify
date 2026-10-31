import axiosClient from './axiosClient'
import { mockUsers } from '../mocks/users'

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true'

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Connexion : retourne l'utilisateur { id, name, email, role, institution_id }
export async function login(email, password) {
  if (USE_MOCKS) {
    await wait(600) // simule le temps de réponse du réseau
    const found = mockUsers.find(
      (u) => u.email === email.trim().toLowerCase() && u.password === password
    )
    if (!found) {
      throw new Error('Adresse e-mail ou mot de passe incorrect.')
    }
    const { password: _password, ...user } = found // on retire le mot de passe
    return user
  }

  // Endpoint PROPOSÉ : POST /auth/login  → { user: {...} }
  try {
    const { data } = await axiosClient.post('/auth/login', { email, password })
    return data.user
  } catch (err) {
    if (err.response?.status === 401) {
      throw new Error('Adresse e-mail ou mot de passe incorrect.')
    }
    throw new Error('Impossible de contacter le serveur. Veuillez réessayer plus tard.')
  }
}