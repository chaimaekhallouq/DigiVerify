import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { useAuth } from './hooks/useAuth'
import PublicLayout from './components/layout/PublicLayout'
import PlaceholderPage from './pages/public/PlaceholderPage'
import HomePage from './pages/public/HomePage'
import LoginPage from './pages/public/LoginPage'
import RegisterPage from './pages/public/RegisterPage'
import ForgotPasswordPage from './pages/public/ForgotPasswordPage'
import ComponentsDemo from './pages/public/ComponentsDemo'

// PAGE PROVISOIRE : sera remplacée par les vrais tableaux de bord (phase 4)
function TemporaryDashboard({ title }) {
  const { user, logout } = useAuth()
  return (
    <div className="container py-5">
      <div className="dv-card p-5 text-center mx-auto" style={{ maxWidth: 560 }}>
        <h1 className="h3">{title}</h1>
        <p className="text-muted">
          Connecté en tant que <strong>{user ? user.name : 'visiteur'}</strong>.
        </p>
        <button className="btn btn-outline-primary" onClick={logout}>
          Se déconnecter
        </button>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/verifier" element={<PlaceholderPage title="Vérifier un diplôme" />} />
            <Route path="/connexion" element={<LoginPage />} />
            <Route path="/inscription" element={<RegisterPage />} />
            <Route path="/mot-de-passe-oublie" element={<ForgotPasswordPage />} />
            <Route path="/composants" element={<ComponentsDemo />} />

            {/* Espaces provisoires (non protégés pour l'instant) */}
            <Route path="/admin" element={<TemporaryDashboard title="Espace Administrateur" />} />
            <Route path="/etablissement" element={<TemporaryDashboard title="Espace Établissement" />} />
            <Route path="/etudiant" element={<TemporaryDashboard title="Espace Étudiant" />} />
            <Route path="/recruteur" element={<TemporaryDashboard title="Espace Recruteur" />} />

            <Route path="*" element={<PlaceholderPage title="Page introuvable" />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App