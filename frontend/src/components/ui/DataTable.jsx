import { useState } from 'react'
import { FaSearch, FaInbox } from 'react-icons/fa'

function DataTable({
  columns,
  rows,
  searchKeys = [],
  searchPlaceholder = 'Rechercher…',
  emptyMessage = 'Aucun résultat.',
  pageSize = 5,
}) {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  // 1. Filtrer selon la recherche
  const q = query.trim().toLowerCase()
  const filtered =
    q && searchKeys.length > 0
      ? rows.filter((row) =>
          searchKeys.some((key) => String(row[key] ?? '').toLowerCase().includes(q))
        )
      : rows

  // 2. Découper en pages
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const start = (currentPage - 1) * pageSize
  const visibleRows = filtered.slice(start, start + pageSize)

  const handleSearch = (e) => {
    setQuery(e.target.value)
    setPage(1) // on revient à la première page à chaque recherche
  }

  return (
    <div className="dv-card">
      {searchKeys.length > 0 && (
        <div className="dv-table__toolbar">
          <div className="dv-table__search">
            <FaSearch className="dv-table__search-icon" />
            <input
              type="search"
              className="form-control"
              placeholder={searchPlaceholder}
              aria-label="Rechercher dans le tableau"
              value={query}
              onChange={handleSearch}
            />
          </div>
          <small className="text-muted">
            {filtered.length} résultat{filtered.length > 1 ? 's' : ''}
          </small>
        </div>
      )}

      <div className="table-responsive">
        <table className="table dv-table align-middle mb-0">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key} scope="col">{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row, index) => (
              <tr key={row.id ?? index}>
                {columns.map((col) => (
                  <td key={col.key}>{col.render ? col.render(row) : row[col.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <div className="dv-table__empty">
          <FaInbox size={28} />
          <p className="mb-0 mt-2">{emptyMessage}</p>
        </div>
      )}

      {filtered.length > pageSize && (
        <div className="dv-table__footer">
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            disabled={currentPage === 1}
            onClick={() => setPage(currentPage - 1)}
          >
            Précédent
          </button>
          <small className="text-muted">
            Page {currentPage} sur {totalPages}
          </small>
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            disabled={currentPage === totalPages}
            onClick={() => setPage(currentPage + 1)}
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  )
}

export default DataTable