import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ROLES } from './utils/constants'
import { NAVIGATION } from './utils/navigation'
import PublicLayout from './components/layout/PublicLayout'
import DashboardLayout from './components/layout/DashboardLayout'
import RoleRoute from './routes/RoleRoute'
import PlaceholderPage from './pages/public/PlaceholderPage'
import HomePage from './pages/public/HomePage'
import LoginPage from './pages/public/LoginPage'
import RegisterPage from './pages/public/RegisterPage'
import ForgotPasswordPage from './pages/public/ForgotPasswordPage'
import ForbiddenPage from './pages/public/ForbiddenPage'
import ComponentsDemo from './pages/public/ComponentsDemo'
import AdminDashboard from './pages/admin/AdminDashboard'
import InstitutionDashboard from './pages/institution/InstitutionDashboard'
import StudentsPage from './pages/institution/StudentsPage'
import DiplomasPage from './pages/institution/DiplomasPage'
import StudentDashboard from './pages/student/StudentDashboard'
import RecruiterDashboard from './pages/recruiter/RecruiterDashboard'

// Crée une route pour chaque entrée du menu d'un rôle.
// `pages` associe un chemin à une vraie page ; les autres restent provisoires.
function roleRoutes(role, pages = {}) {
  return NAVIGATION[role].map((item) => (
    <Route
      key={item.to}
      path={item.to}
      element={pages[item.to] || <PlaceholderPage title={item.label} />}
    />
  ))
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Pages publiques : barre de navigation + pied de page */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/verifier" element={<PlaceholderPage title="Vérifier un diplôme" />} />
            <Route path="/connexion" element={<LoginPage />} />
            <Route path="/inscription" element={<RegisterPage />} />
            <Route path="/mot-de-passe-oublie" element={<ForgotPasswordPage />} />
            <Route path="/acces-refuse" element={<ForbiddenPage />} />
            <Route path="/composants" element={<ComponentsDemo />} />
            <Route path="*" element={<PlaceholderPage title="Page introuvable" />} />
          </Route>

          {/* Espaces protégés : barre latérale + barre du haut */}
          <Route element={<RoleRoute allowedRoles={[ROLES.ADMIN]} />}>
            <Route element={<DashboardLayout />}>
              {roleRoutes('ADMIN', {
                '/admin': <AdminDashboard />,
              })}
            </Route>
          </Route>

          <Route element={<RoleRoute allowedRoles={[ROLES.INSTITUTION]} />}>
            <Route element={<DashboardLayout />}>
              {roleRoutes('INSTITUTION', {
                '/etablissement': <InstitutionDashboard />,
                '/etablissement/etudiants': <StudentsPage />,
                '/etablissement/diplomes': <DiplomasPage />,
              })}
            </Route>
          </Route>

          <Route element={<RoleRoute allowedRoles={[ROLES.STUDENT]} />}>
            <Route element={<DashboardLayout />}>
              {roleRoutes('STUDENT', {
                '/etudiant': <StudentDashboard />,
              })}
            </Route>
          </Route>

          <Route element={<RoleRoute allowedRoles={[ROLES.RECRUITER]} />}>
            <Route element={<DashboardLayout />}>
              {roleRoutes('RECRUITER', {
                '/recruteur': <RecruiterDashboard />,
              })}
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App