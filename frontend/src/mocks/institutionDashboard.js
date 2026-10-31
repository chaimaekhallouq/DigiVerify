// DONNÉES FICTIVES – à remplacer par l'API FastAPI (phase 7)
export const mockInstitutionDashboard = {
  students: 1248,
  issued: 934,
  drafts: 12,
  revoked: 7,
  recentDiplomas: [
    { id: 'DV-2026-0008', student: 'Théo Fontaine', title: 'Doctorat en Informatique', issuedAt: '2026-09-05T16:20:00Z', status: 'ISSUED' },
    { id: 'DV-2026-0006', student: 'Nathan Girard', title: 'Licence en Physique', issuedAt: '2026-07-10T11:45:00Z', status: 'ISSUED' },
    { id: 'DV-2026-0007', student: 'Manon Roux', title: 'Master en Droit du numérique', issuedAt: null, status: 'DRAFT' },
    { id: 'DV-2026-0004', student: 'Hugo Lefèvre', title: 'Master en Intelligence Artificielle', issuedAt: '2026-07-02T14:10:00Z', status: 'REVOKED' },
    { id: 'DV-2026-0002', student: 'Lucas Bernard', title: 'Master en Cybersécurité', issuedAt: '2026-06-15T10:32:00Z', status: 'ISSUED' },
  ],
}