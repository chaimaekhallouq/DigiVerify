import axios from 'axios'
import { toCamel, toSnake } from '../utils/caseConverter'

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000, // 15 secondes
  withCredentials: true, // envoie le cookie httpOnly de session, si le backend l'utilise
})

// Requêtes : camelCase → snake_case (sauf fichiers envoyés en FormData)
axiosClient.interceptors.request.use((config) => {
  if (config.data && !(config.data instanceof FormData) && typeof config.data === 'object') {
    config.data = toSnake(config.data)
  }
  return config
})

// Réponses : snake_case → camelCase (sauf fichiers PDF reçus en blob)
axiosClient.interceptors.response.use(
  (response) => {
    if (response.data && !(response.data instanceof Blob)) {
      response.data = toCamel(response.data)
    }
    return response
  },
  (error) => {
    // Session expirée ou invalide : on prévient l'application (hors tentative de connexion)
    const isLogin = error.config?.url?.includes('/auth/login')
    if (error.response?.status === 401 && !isLogin) {
      window.dispatchEvent(new Event('dv:unauthorized'))
    }
    return Promise.reject(error)
  }
)

export default axiosClient