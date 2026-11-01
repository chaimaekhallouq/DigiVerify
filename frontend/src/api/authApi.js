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


// Inscription : retourne l'utilisateur créé
// Endpoint PROPOSÉ : POST /auth/register  { name, email, password, role }
export async function register({ name, email, password, role }) {
  if (USE_MOCKS) {
    await wait(700)
    const normalizedEmail = email.trim().toLowerCase()
    if (mockUsers.some((u) => u.email === normalizedEmail)) {
      throw new Error('Un compte existe déjà avec cette adresse e-mail.')
    }
    if (role !== 'STUDENT' && role !== 'RECRUITER') {
      throw new Error("Ce type de compte ne peut pas être créé par inscription.")
    }
    // Le compte n'existe qu'en mémoire : il disparaît au rechargement de la page
    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: normalizedEmail,
      password,
      role,
      institution_id: null,
    }
    mockUsers.push(newUser)
    const { password: _password, ...user } = newUser
    return user
  }

  try {
    const { data } = await axiosClient.post('/auth/register', { name, email, password, role })
    return data.user
  } catch (err) {
    if (err.response?.status === 409) {
      throw new Error('Un compte existe déjà avec cette adresse e-mail.')
    }
    if (err.response?.status === 422) {
      throw new Error('Les informations saisies sont invalides.')
    }
    throw new Error('Impossible de contacter le serveur. Veuillez réessayer plus tard.')
  }
}

// Demande de réinitialisation du mot de passe
// Endpoint PROPOSÉ : POST /auth/forgot-password  { email }
export async function forgotPassword(email) {
  if (USE_MOCKS) {
    await wait(700)
    return
  }

  try {
    await axiosClient.post('/auth/forgot-password', { email })
  } catch {
    throw new Error('Impossible de contacter le serveur. Veuillez réessayer plus tard.')
  }
}

// Endpoint PROPOSÉ : POST /auth/logout  (le backend supprime le cookie de session)
export async function logout() {
  if (USE_MOCKS) return
  try {
    await axiosClient.post('/auth/logout')
  } catch {
    // Même en cas d'échec réseau, on déconnecte l'interface locale
  }
}

// Endpoint PROPOSÉ : GET /auth/me  → { user: {...} }
// Sert à vérifier que la session est encore valide au chargement de l'application.
export async function getMe() {
  if (USE_MOCKS) return null
  const { data } = await axiosClient.get('/auth/me')
  return data.user
}