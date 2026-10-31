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