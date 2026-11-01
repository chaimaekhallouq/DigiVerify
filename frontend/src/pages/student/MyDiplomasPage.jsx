import { useState } from 'react'
import { FaRedo } from 'react-icons/fa'
import { useFetch } from '../../hooks/useFetch'
import { getMyDiplomas, downloadDiplomaPdf } from '../../api/diplomasApi'
import { saveBlob } from '../../utils/download'
import PageHeader from '../../components/layout/PageHeader'
import LoadingState from '../../components/ui/LoadingState'
import Alert from '../../components/ui/Alert'
import DiplomaCard from '../../components/diploma/DiplomaCard'

function MyDiplomasPage() {
  const { data, loading, error, reload } = useFetch(getMyDiplomas)
  const [downloadingId, setDownloadingId] = useState(null)
  const [notice, setNotice] = useState(null)

  const handleDownload = async (diploma) => {
    setNotice(null)
    setDownloadingId(diploma.id)
    try {
      const blob = await downloadDiplomaPdf(diploma.id)
      if (blob) {
        saveBlob(blob, `diplome-${diploma.id}.pdf`)
        setNotice({ variant: 'success', message: 'Le diplôme a été téléchargé.' })
      } else {
        setNotice({ variant: 'info', message: 'Mode démonstration : le PDF officiel signé sera généré par le serveur.' })
      }
    } catch (err) {
      setNotice({ variant: 'danger', message: err.message })
    } finally {
      setDownloadingId(null)
    }
  }

  return (
    <div className="container-fluid px-3 px-lg-4">
      <PageHeader title="Mes diplômes" subtitle="Téléchargez vos diplômes et partagez leur QR Code." />

      {loading && <LoadingState message="Chargement de vos diplômes…" />}

      {error && (
        <Alert variant="danger" title="Erreur de chargement">
          <p className="mb-2">{error}</p>
          <button type="button" className="btn btn-outline-primary btn-sm" onClick={reload}>
            <FaRedo className="me-2" />
            Réessayer
          </button>
        </Alert>
      )}

      {notice && (
        <Alert variant={notice.variant} onClose={() => setNotice(null)}>
          {notice.message}
        </Alert>
      )}

      {data &&
        (data.length === 0 ? (
          <div className="dv-card p-5 text-center text-muted">
            Aucun diplôme n'a encore été émis à votre nom.
          </div>
        ) : (
          <div className="row g-3">
            {data.map((diploma) => (
              <div key={diploma.id} className="col-12 col-md-6 col-xl-4">
                <DiplomaCard
                  diploma={diploma}
                  onDownload={handleDownload}
                  downloading={downloadingId === diploma.id}
                />
              </div>
            ))}
          </div>
        ))}
    </div>
  )
}

export default MyDiplomasPage