// DONNÉES FICTIVES – à remplacer par l'API FastAPI (phase 7)
// verificationUrl serait fournie par le backend ; la page /verifier/:id sera créée en phase 6.
export const mockStudentDiplomas = [
  {
    id: 'DV-2026-0001',
    title: 'Licence en Informatique',
    institution: 'Université de Lyon',
    issuedAt: '2026-06-15T10:30:00Z',
    status: 'ISSUED',
    verificationUrl: 'http://localhost:5173/verifier/DV-2026-0001',
  },
  {
    id: 'DV-2024-0412',
    title: 'BUT Informatique',
    institution: 'IUT de Villeurbanne',
    issuedAt: '2024-07-04T09:15:00Z',
    status: 'ISSUED',
    verificationUrl: 'http://localhost:5173/verifier/DV-2024-0412',
  },
  {
    id: 'DV-2025-0188',
    title: 'Certificat en Cybersécurité',
    institution: 'Université de Toulouse',
    issuedAt: '2025-02-12T14:00:00Z',
    status: 'REVOKED',
    verificationUrl: 'http://localhost:5173/verifier/DV-2025-0188',
  },
]