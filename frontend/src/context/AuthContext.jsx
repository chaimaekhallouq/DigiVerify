import { createContext, useState } from 'react'
import * as authApi from '../api/authApi'

export const AuthContext = createContext(null)

const STORAGE_KEY = 'digiverify_user'

// Lit l'utilisateur mémorisé (profil uniquement, jamais de mot de passe ni de clé)
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

  const login = async (email, password) => {
    const loggedUser = await authApi.login(email, password)
    setUser(loggedUser)
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(loggedUser))
    return loggedUser
  }

  const logout = () => {
    setUser(null)
    sessionStorage.removeItem(STORAGE_KEY)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}