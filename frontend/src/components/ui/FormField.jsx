function FormField({ id, label, error, helpText, required = false, ...inputProps }) {
  const describedBy = error ? `${id}-error` : helpText ? `${id}-help` : undefined

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
        {required && <span className="text-danger"> *</span>}
      </label>

      <input
        id={id}
        className={`form-control ${error ? 'is-invalid' : ''}`}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={describedBy}
        required={required}
        {...inputProps}
      />

      {error && (
        <div id={`${id}-error`} className="invalid-feedback">
          {error}
        </div>
      )}
      {!error && helpText && (
        <div id={`${id}-help`} className="form-text">
          {helpText}
        </div>
      )}
    </div>
  )
}

export default FormField