import { Link } from 'react-router-dom'
import Logo from './logo'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="dv-footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-12 col-md-6">
            <Logo light />
            <p className="dv-footer__text mt-3 mb-0">
              Plateforme sécurisée d'émission et d'authentification de diplômes
              numériques, fondée sur la signature numérique et les certificats X.509.
            </p>
          </div>

          <div className="col-6 col-md-3">
            <h2 className="dv-footer__title">Navigation</h2>
            <ul className="list-unstyled mb-0">
              <li><Link to="/" className="dv-footer__link">Accueil</Link></li>
              <li><Link to="/verifier" className="dv-footer__link">Vérifier un diplôme</Link></li>
            </ul>
          </div>

          <div className="col-6 col-md-3">
            <h2 className="dv-footer__title">Mon compte</h2>
            <ul className="list-unstyled mb-0">
              <li><Link to="/connexion" className="dv-footer__link">Connexion</Link></li>
              <li><Link to="/inscription" className="dv-footer__link">Créer un compte</Link></li>
            </ul>
          </div>
        </div>

        <hr className="dv-footer__divider" />
        <p className="dv-footer__copy mb-0">
          © {year} DigiVerify – Projet universitaire. Tous droits réservés.
        </p>
      </div>
    </footer>
  )
}

export default Footer
