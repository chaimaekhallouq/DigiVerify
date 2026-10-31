// DONNÉES FICTIVES – à remplacer par l'API FastAPI (phase 7)
export const mockRecruiterDashboard = {
  total: 42,
  authentic: 31,
  problems: 11, // modifié, invalide, révoqué ou non fiable
  recentVerifications: [
    { id: 'VER-0042', diplomaId: 'DV-2026-0001', student: 'Camille Martin', title: 'Licence en Informatique', method: 'QR_CODE', result: 'AUTHENTIC', verifiedAt: '2026-10-30T09:12:00Z' },
    { id: 'VER-0041', diplomaId: null, student: 'Fichier inconnu', title: 'diplome_scan.pdf', method: 'PDF_UPLOAD', result: 'INVALID', verifiedAt: '2026-10-29T15:40:00Z' },
    { id: 'VER-0040', diplomaId: 'DV-2026-0004', student: 'Hugo Lefèvre', title: 'Master en Intelligence Artificielle', method: 'QR_CODE', result: 'REVOKED', verifiedAt: '2026-10-28T11:05:00Z' },
    { id: 'VER-0039', diplomaId: 'DV-2026-0002', student: 'Lucas Bernard', title: 'Master en Cybersécurité', method: 'PDF_UPLOAD', result: 'MODIFIED', verifiedAt: '2026-10-27T16:22:00Z' },
    { id: 'VER-0038', diplomaId: 'DV-2025-0310', student: 'Inès Dubois', title: 'Licence en Mathématiques', method: 'PDF_UPLOAD', result: 'UNTRUSTED', verifiedAt: '2026-10-25T10:30:00Z' },
    { id: 'VER-0037', diplomaId: 'DV-2026-0008', student: 'Théo Fontaine', title: 'Doctorat en Informatique', method: 'QR_CODE', result: 'AUTHENTIC', verifiedAt: '2026-10-24T14:18:00Z' },
  ],
}