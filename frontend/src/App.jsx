import { FaShieldAlt } from 'react-icons/fa'

function App() {
  return (
    <div className="container py-5">
      <div className="card shadow-sm mx-auto" style={{ maxWidth: 520 }}>
        <div className="card-body text-center p-4">
          <FaShieldAlt size={48} className="text-primary mb-3" />
          <h1 className="h3">DigiVerify</h1>
          <p className="text-muted">
            Plateforme sécurisée d'émission et d'authentification de diplômes numériques.
          </p>
          <button className="btn btn-primary">Vérifier un diplôme</button>
        </div>
      </div>
    </div>
  )
}

export default App