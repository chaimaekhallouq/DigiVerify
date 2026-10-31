import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PublicLayout from './components/layout/PublicLayout'
import PlaceholderPage from './pages/public/PlaceholderPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<PlaceholderPage title="Accueil" />} />
          <Route path="/verifier" element={<PlaceholderPage title="Vérifier un diplôme" />} />
          <Route path="/connexion" element={<PlaceholderPage title="Connexion" />} />
          <Route path="/inscription" element={<PlaceholderPage title="Créer un compte" />} />
          <Route path="*" element={<PlaceholderPage title="Page introuvable" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App