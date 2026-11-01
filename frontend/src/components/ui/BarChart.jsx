// items : [{ label, value, tone }]  (tone : primary, authentic, modified, invalid, revoked, untrusted)
function BarChart({ items }) {
  const max = Math.max(...items.map((i) => i.value), 1)

  return (
    <ul className="dv-bars">
      {items.map((item) => (
        <li key={item.label} className="dv-bars__row">
          <span className="dv-bars__label">{item.label}</span>
          <div className="dv-bars__track">
            <div
              className={`dv-bars__fill dv-bars__fill--${item.tone || 'primary'}`}
              style={{ width: `${(item.value / max) * 100}%` }}
            />
          </div>
          <span className="dv-bars__value">{item.value.toLocaleString('fr-FR')}</span>
        </li>
      ))}
    </ul>
  )
}

export default BarChart