import {
  FaTachometerAlt,
  FaUniversity,
  FaUsers,
  FaChartBar,
  FaUserGraduate,
  FaGraduationCap,
  FaPlusCircle,
  FaUser,
  FaSearch,
  FaHistory,
} from 'react-icons/fa'

// Menu de chaque rôle. `end: true` : le lien n'est surligné que sur sa page exacte.
export const NAVIGATION = {
  ADMIN: [
    { label: 'Tableau de bord', to: '/admin', icon: FaTachometerAlt, end: true },
    { label: 'Établissements', to: '/admin/etablissements', icon: FaUniversity },
    { label: 'Utilisateurs', to: '/admin/utilisateurs', icon: FaUsers },
    { label: 'Rapports', to: '/admin/rapports', icon: FaChartBar },
  ],
  INSTITUTION: [
    { label: 'Tableau de bord', to: '/etablissement', icon: FaTachometerAlt, end: true },
    { label: 'Étudiants', to: '/etablissement/etudiants', icon: FaUserGraduate },
    { label: 'Diplômes', to: '/etablissement/diplomes', icon: FaGraduationCap, end: true },
    { label: 'Créer un diplôme', to: '/etablissement/diplomes/nouveau', icon: FaPlusCircle },
    { label: 'Mon établissement', to: '/etablissement/profil', icon: FaUniversity },
  ],
  STUDENT: [
    { label: 'Tableau de bord', to: '/etudiant', icon: FaTachometerAlt, end: true },
    { label: 'Mes diplômes', to: '/etudiant/diplomes', icon: FaGraduationCap },
    { label: 'Mon profil', to: '/etudiant/profil', icon: FaUser },
  ],
  RECRUITER: [
    { label: 'Tableau de bord', to: '/recruteur', icon: FaTachometerAlt, end: true },
    { label: 'Vérifier un diplôme', to: '/recruteur/verifier', icon: FaSearch },
    { label: 'Historique des vérifications', to: '/recruteur/historique', icon: FaHistory },
  ],
}