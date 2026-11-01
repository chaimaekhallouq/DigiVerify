import axiosClient from './axiosClient'
import { mockUsersList } from '../mocks/usersList'

const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true'
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

let users = mockUsersList.map((u) => ({ ...u }))

// Endpoint PROPOSÉ : GET /users  (administrateur)
// Réponse : [{ id, name, email, role, status: 'ACTIVE'|'SUSPENDED', createdAt }]
export async function getUsers() {
  if (USE_MOCKS) {
    await wait(500)
    return users.map((u) => ({ ...u }))
  }
  try {
    const { data } = await axiosClient.get('/users')
    return data
  } catch {
    throw new Error('Impossible de charger les utilisateurs. Veuillez réessayer.')
  }
}

// Endpoint PROPOSÉ : PATCH /users/{id}/status  { status }
export async function setUserStatus(id, status) {
  if (USE_MOCKS) {
    await wait(500)
    users = users.map((u) => (u.id === id ? { ...u, status } : u))
    return users.find((u) => u.id === id)
  }
  try {
    const { data } = await axiosClient.patch(`/users/${id}/status`, { status })
    return data
  } catch {
    throw new Error('La modification du compte a échoué. Veuillez réessayer.')
  }
}