// options : [{ value: 'ALL', label: 'Tous', count: 8 }, ...]
function StatusFilter({ options, value, onChange }) {
  return (
    <div className="dv-filter" role="group" aria-label="Filtrer par statut">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className={`dv-filter__btn ${value === opt.value ? 'is-active' : ''}`}
          aria-pressed={value === opt.value}
          onClick={() => onChange(opt.value)}
        >
          {opt.label} <span className="dv-filter__count">{opt.count}</span>
        </button>
      ))}
    </div>
  )
}

export default StatusFilter