import { createContext, useEffect, useState } from 'react'
import * as authApi from '../api/authApi'

export const AuthContext = createContext(null)

const STORAGE_KEY = 'digiverify_user'
const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true'

// Lit l'utilisateur mémorisé (profil uniquement, jamais de mot de passe, de jeton ni de clé)
function loadStoredUser() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadStoredUser)

  const clearSession = () => {
    setUser(null)
    sessionStorage.removeItem(STORAGE_KEY)
  }

  // Le serveur répond 401 : la session a expiré, on déconnecte l'interface
  useEffect(() => {
    window.addEventListener('dv:unauthorized', clearSession)
    return () => window.removeEventListener('dv:unauthorized', clearSession)
  }, [])

  // Avec le vrai backend, on vérifie au démarrage que la session est toujours valide
  useEffect(() => {
    if (!USE_MOCKS && user) {
      authApi.getMe().catch(() => {}) // un 401 déclenche « dv:unauthorized »
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const login = async (email, password) => {
    const loggedUser = await authApi.login(email, password)
    setUser(loggedUser)
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(loggedUser))
    return loggedUser
  }

  const logout = () => {
    authApi.logout()
    clearSession()
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}