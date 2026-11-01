const toCamelKey = (s) => s.replace(/_([a-z0-9])/g, (_, c) => c.toUpperCase())
const toSnakeKey = (s) => s.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`)

// Convertit récursivement les CLÉS d'un objet ou d'un tableau (les valeurs ne changent pas)
function convert(value, fn) {
  if (Array.isArray(value)) return value.map((v) => convert(v, fn))
  if (value && value.constructor === Object) {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [fn(k), convert(v, fn)]))
  }
  return value
}

export const toCamel = (value) => convert(value, toCamelKey)
export const toSnake = (value) => convert(value, toSnakeKey)