import { useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaRedo } from 'react-icons/fa'
import { useFetch } from '../../hooks/useFetch'
import { verifyById } from '../../api/verificationApi'
import LoadingState from '../../components/ui/LoadingState'
import Alert from '../../components/ui/Alert'
import VerificationResult from '../../components/verification/VerificationResult'

function VerifyByIdPage() {
  const { id } = useParams()
  const fetcher = useCallback(() => verifyById(id), [id])
  const { data, loading, error, reload } = useFetch(fetcher)

  return (
    <div className="container py-5" style={{ maxWidth: 800 }}>
      <h1 className="h3 mb-1">Résultat de la vérification</h1>
      <p className="text-muted mb-4">Diplôme référencé : {id}</p>

      {loading && <LoadingState message="Vérification en cours…" />}

      {error && (
        <Alert variant="danger" title="Vérification impossible">
          <p className="mb-2">{error}</p>
          <button type="button" className="btn btn-outline-primary btn-sm" onClick={reload}>
            <FaRedo className="me-2" />
            Réessayer
          </button>
        </Alert>
      )}

      {data && <VerificationResult response={data} />}

      <Link to="/verifier" className="btn btn-outline-primary mt-4">
        Vérifier un autre diplôme
      </Link>
    </div>
  )
}

export default VerifyByIdPage