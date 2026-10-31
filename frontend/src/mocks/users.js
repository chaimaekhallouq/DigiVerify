// COMPTES FICTIFS – à supprimer à l'intégration avec FastAPI (phase 7)
export const mockUsers = [
  {
    id: 1,
    name: 'Sophie Laurent',
    email: 'admin@digiverify.fr',
    password: 'Admin123!',
    role: 'ADMIN',
    institution_id: null,
  },
  {
    id: 2,
    name: 'Université de Lyon',
    email: 'etablissement@digiverify.fr',
    password: 'Etab123!',
    role: 'INSTITUTION',
    institution_id: 10,
  },
  {
    id: 3,
    name: 'Camille Martin',
    email: 'etudiant@digiverify.fr',
    password: 'Etud123!',
    role: 'STUDENT',
    institution_id: null,
  },
  {
    id: 4,
    name: 'Julien Petit',
    email: 'recruteur@digiverify.fr',
    password: 'Recr123!',
    role: 'RECRUITER',
    institution_id: null,
  },
]