import { useRef, useState } from 'react'
import { FaFilePdf } from 'react-icons/fa'

function PdfDropzone({ file, onFile, error, disabled = false }) {
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef(null)

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    if (!disabled && e.dataTransfer.files[0]) onFile(e.dataTransfer.files[0])
  }

  return (
    <div>
      <div
        className={`dv-dropzone ${dragging ? 'is-dragging' : ''} ${error ? 'is-invalid' : ''}`}
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <FaFilePdf size={34} className="mb-2" />
        <p className="mb-2 fw-semibold">Glissez-déposez votre diplôme (PDF) ici</p>
        <p className="small text-muted mb-3">ou</p>
        <button
          type="button"
          className="btn btn-outline-primary btn-sm"
          disabled={disabled}
          onClick={() => inputRef.current.click()}
        >
          Parcourir mes fichiers
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,.pdf"
          className="d-none"
          onChange={(e) => {
            if (e.target.files[0]) onFile(e.target.files[0])
            e.target.value = '' // permet de re-sélectionner le même fichier
          }}
        />
        {file && (
          <p className="mt-3 mb-0 small">
            <strong>{file.name}</strong> ({Math.max(1, Math.round(file.size / 1024))} Ko)
          </p>
        )}
      </div>
      {error && <div className="text-danger small mt-2">{error}</div>}
    </div>
  )
}

export default PdfDropzone