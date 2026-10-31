export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Retourne un message d'erreur en français, ou '' si le mot de passe est valide
export function validatePassword(password) {
  if (!password) return 'Le mot de passe est obligatoire.'
  if (password.length < 8) return 'Le mot de passe doit contenir au moins 8 caractères.'
  if (!/[A-Z]/.test(password)) return 'Le mot de passe doit contenir au moins une majuscule.'
  if (!/[a-z]/.test(password)) return 'Le mot de passe doit contenir au moins une minuscule.'
  if (!/[0-9]/.test(password)) return 'Le mot de passe doit contenir au moins un chiffre.'
  if (!/[^A-Za-z0-9]/.test(password)) return 'Le mot de passe doit contenir au moins un caractère spécial.'
  return ''
}