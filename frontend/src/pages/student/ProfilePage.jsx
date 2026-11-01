import { useAuth } from '../../hooks/useAuth'
import { ROLE_LABELS } from '../../utils/constants'
import PageHeader from '../../components/layout/PageHeader'
import Alert from '../../components/ui/Alert'

function ProfilePage() {
  const { user } = useAuth()

  return (
    <div className="container-fluid px-3 px-lg-4">
      <PageHeader title="Mon profil" subtitle="Les informations de votre compte." />

      <div className="dv-card p-4" style={{ maxWidth: 560 }}>
        <dl className="dv-diploma__meta">
          <dt>Nom</dt>
          <dd>{user.name}</dd>
          <dt>E-mail</dt>
          <dd>{user.email}</dd>
          <dt>Type de compte</dt>
          <dd>{ROLE_LABELS[user.role]}</dd>
        </dl>
        <Alert variant="info">
          La modification du profil et du mot de passe sera disponible lorsque le serveur proposera
          ces fonctions.
        </Alert>
      </div>
    </div>
  )
}

export default ProfilePage