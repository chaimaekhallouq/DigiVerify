import { useState } from 'react'
import { FaGraduationCap, FaCheckCircle, FaBan, FaRedo } from 'react-icons/fa'
import { useAuth } from '../../hooks/useAuth'
import { useFetch } from '../../hooks/useFetch'
import { getMyDiplomas, downloadDiplomaPdf } from '../../api/diplomasApi'
import { saveBlob } from '../../utils/download'
import PageHeader from '../../components/layout/PageHeader'
import LoadingState from '../../components/ui/LoadingState'
import Alert from '../../components/ui/Alert'
import StatCard from '../../components/ui/StatCard'
import DiplomaCard from '../../components/diploma/DiplomaCard'

function StudentDashboard() {
  const { user } = useAuth()
  const { data, loading, error, reload } = useFetch(getMyDiplomas)

  const [downloadingId, setDownloadingId] = useState(null)
  const [notice, setNotice] = useState(null) // { variant, message }

  const handleDownload = async (diploma) => {
    setNotice(null)
    setDownloadingId(diploma.id)
    try {
      const blob = await downloadDiplomaPdf(diploma.id)
      if (blob) {
        saveBlob(blob, `diplome-${diploma.id}.pdf`)
        setNotice({ variant: 'success', message: 'Le diplôme a été téléchargé.' })
      } else {
        setNotice({
          variant: 'info',
          message:
            "Mode démonstration : le PDF officiel signé sera généré par le serveur lors de l'intégration.",
        })
      }
    } catch (err) {
      setNotice({ variant: 'danger', message: err.message })
    } finally {
      setDownloadingId(null)
    }
  }

  const diplomas = data || []
  const validCount = diplomas.filter((d) => d.status === 'ISSUED').length
  const revokedCount = diplomas.filter((d) => d.status === 'REVOKED').length

  return (
    <div className="container-fluid px-3 px-lg-4">
      <PageHeader
        title="Tableau de bord"
        subtitle={`Bienvenue, ${user.name}. Retrouvez ici vos diplômes numériques.`}
      />

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

      {data && (
        <>
          <div className="row g-3 mb-4">
            <div className="col-12 col-sm-4">
              <StatCard icon={<FaGraduationCap />} label="Diplômes" value={diplomas.length} />
            </div>
            <div className="col-12 col-sm-4">
              <StatCard icon={<FaCheckCircle />} label="Diplômes valides" value={validCount} tone="success" />
            </div>
            <div className="col-12 col-sm-4">
              <StatCard icon={<FaBan />} label="Diplômes révoqués" value={revokedCount} tone="danger" />
            </div>
          </div>

          {notice && (
            <Alert variant={notice.variant} onClose={() => setNotice(null)}>
              {notice.message}
            </Alert>
          )}

          <h2 className="h5 mb-3">Mes diplômes</h2>

          {diplomas.length === 0 ? (
            <div className="dv-card p-5 text-center text-muted">
              Aucun diplôme n'a encore été émis à votre nom.
            </div>
          ) : (
            <div className="row g-3">
              {diplomas.map((diploma) => (
                <div key={diploma.id} className="col-12 col-md-6 col-xl-4">
                  <DiplomaCard
                    diploma={diploma}
                    onDownload={handleDownload}
                    downloading={downloadingId === diploma.id}
                  />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default StudentDashboard