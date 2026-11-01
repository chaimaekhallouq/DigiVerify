// Rôles des utilisateurs (valeurs à confirmer avec le backend)
export const ROLES = {
  ADMIN: 'ADMIN',
  INSTITUTION: 'INSTITUTION',
  STUDENT: 'STUDENT',
  RECRUITER: 'RECRUITER',
}

// Libellés français affichés dans l'interface
export const ROLE_LABELS = {
  ADMIN: 'Administrateur',
  INSTITUTION: 'Établissement',
  STUDENT: 'Étudiant',
  RECRUITER: 'Recruteur',
}

// Statuts d'un diplôme (proposition, à confirmer avec le backend)
export const DIPLOMA_STATUS = {
  DRAFT: 'DRAFT',
  ISSUED: 'ISSUED',
  REVOKED: 'REVOKED',
}

// Résultats d'une vérification (proposition, à confirmer avec le backend)
export const VERIFICATION_RESULT = {
  AUTHENTIC: 'AUTHENTIC',
  MODIFIED: 'MODIFIED',
  INVALID: 'INVALID',
  REVOKED: 'REVOKED',
  UNTRUSTED: 'UNTRUSTED',
}
// Page d'accueil de chaque rôle après connexion
export const ROLE_HOME = {
  ADMIN: '/admin',
  INSTITUTION: '/etablissement',
  STUDENT: '/etudiant',
  RECRUITER: '/recruteur',
}
// Niveaux de diplôme proposés dans le formulaire (à confirmer avec le backend)
export const DIPLOMA_LEVELS = ['BTS', 'BUT', 'Licence', 'Master', 'Ingénieur', 'Doctorat']
