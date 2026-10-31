function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="dv-page-header">
      <div>
        <h1 className="h3 mb-1">{title}</h1>
        {subtitle && <p className="text-muted mb-0">{subtitle}</p>}
      </div>
      {actions && <div className="dv-page-header__actions">{actions}</div>}
    </div>
  )
}

export default PageHeader