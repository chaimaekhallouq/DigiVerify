import { Link } from 'react-router-dom'
import {
  FaShieldAlt,
  FaFileSignature,
  FaQrcode,
  FaSearch,
  FaCertificate,
  FaFingerprint,
  FaBan,
  FaArrowRight,
} from 'react-icons/fa'

const steps = [
  {
    icon: <FaFileSignature />,
    title: '1. Émission',
    text: "L'établissement crée le diplôme. La plateforme le signe numériquement et génère le document officiel.",
  },
  {
    icon: <FaQrcode />,
    title: '2. Partage',
    text: "Chaque diplôme porte un QR Code unique. L'étudiant peut le télécharger et le présenter à un recruteur.",
  },
  {
    icon: <FaSearch />,
    title: '3. Vérification',
    text: "Le recruteur scanne le QR Code ou dépose le fichier PDF : le résultat s'affiche en quelques secondes.",
  },
]

const guarantees = [
  {
    icon: <FaFingerprint />,
    title: 'Empreinte numérique',
    text: "Toute modification du document, même minime, est détectée grâce à l'empreinte SHA-256.",
  },
  {
    icon: <FaShieldAlt />,
    title: 'Signature numérique',
    text: "Chaque diplôme est signé avec RSA-PSS. Seul l'établissement émetteur peut produire une signature valide.",
  },
  {
    icon: <FaCertificate />,
    title: 'Certificats X.509',
    text: "L'identité de chaque établissement est garantie par un certificat numérique vérifié.",
  },
  {
    icon: <FaBan />,
    title: 'Révocation',
    text: "Un diplôme annulé est immédiatement signalé comme révoqué lors de toute vérification.",
  },
]

function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <section className="dv-hero">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-7">
              <span className="dv-hero__badge">
                <FaShieldAlt /> Authentification sécurisée
              </span>
              <h1 className="dv-hero__title">
                Des diplômes numériques impossibles à falsifier
              </h1>
              <p className="dv-hero__lead">
                DigiVerify permet aux établissements d'émettre des diplômes signés
                numériquement, et aux recruteurs d'en vérifier l'authenticité en
                quelques secondes.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link to="/verifier" className="btn btn-primary btn-lg">
                  Vérifier un diplôme
                </Link>
                <Link to="/inscription" className="btn btn-outline-primary btn-lg">
                  Créer un compte
                </Link>
              </div>
            </div>

            <div className="col-12 col-lg-5">
              <div className="dv-hero__card dv-card p-4">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <span className="dv-hero__check">
                    <FaShieldAlt />
                  </span>
                  <div>
                    <strong className="d-block">Diplôme authentique</strong>
                    <small className="text-muted">Vérifié le 15 juin 2026</small>
                  </div>
                </div>
                <dl className="dv-hero__list mb-0">
                  <dt>Titulaire</dt>
                  <dd>Camille Martin</dd>
                  <dt>Diplôme</dt>
                  <dd>Licence en Informatique</dd>
                  <dt>Établissement</dt>
                  <dd>Université de Lyon</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Fonctionnement */}
      <section className="dv-section">
        <div className="container">
          <h2 className="dv-section__title">Comment ça fonctionne ?</h2>
          <p className="dv-section__subtitle">
            Un parcours simple en trois étapes, de l'émission à la vérification.
          </p>
          <div className="row g-4">
            {steps.map((s) => (
              <div key={s.title} className="col-12 col-md-4">
                <div className="dv-card dv-feature h-100">
                  <div className="dv-feature__icon">{s.icon}</div>
                  <h3 className="h5">{s.title}</h3>
                  <p className="text-muted mb-0">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Garanties */}
      <section className="dv-section dv-section--alt">
        <div className="container">
          <h2 className="dv-section__title">Une sécurité fondée sur la cryptographie</h2>
          <p className="dv-section__subtitle">
            Toutes les opérations sensibles sont réalisées côté serveur. Aucune clé
            privée n'est jamais exposée dans votre navigateur.
          </p>
          <div className="row g-4">
            {guarantees.map((g) => (
              <div key={g.title} className="col-12 col-sm-6 col-lg-3">
                <div className="dv-card dv-feature h-100">
                  <div className="dv-feature__icon">{g.icon}</div>
                  <h3 className="h6">{g.title}</h3>
                  <p className="text-muted small mb-0">{g.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Appel à l'action */}
      <section className="dv-section">
        <div className="container">
          <div className="dv-cta">
            <div>
              <h2 className="dv-cta__title">Prêt à vérifier un diplôme ?</h2>
              <p className="dv-cta__text mb-0">
                Aucun compte n'est nécessaire pour vérifier un diplôme à partir de son QR Code.
              </p>
            </div>
            <Link to="/verifier" className="btn btn-light btn-lg">
              Vérifier maintenant <FaArrowRight className="ms-1" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage