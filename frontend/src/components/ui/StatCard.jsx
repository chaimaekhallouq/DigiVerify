function StatCard({ icon, label, value, tone = 'primary' }) {
  return (
    <div className="dv-card dv-stat">
      <div className={`dv-stat__icon dv-stat__icon--${tone}`}>{icon}</div>
      <div>
        <div className="dv-stat__value">{value}</div>
        <div className="dv-stat__label">{label}</div>
      </div>
    </div>
  )
}

export default StatCard