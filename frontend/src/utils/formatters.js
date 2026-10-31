// Transforme "2026-06-15T10:30:00Z" en "15 juin 2026"
export function formatDate(isoString) {
  if (!isoString) return '—'
  return new Date(isoString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}