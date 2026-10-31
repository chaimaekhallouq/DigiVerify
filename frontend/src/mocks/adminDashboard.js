// DONNÉES FICTIVES – à remplacer par l'API FastAPI (phase 7)
export const mockAdminDashboard = {
  institutions: 14,
  users: 3126,
  diplomasIssued: 8450,
  verifications: 12873,
  expiringCertificates: 1, // certificats qui expirent dans moins de 60 jours
  recentInstitutions: [
    { id: 14, name: 'Université de Lille', city: 'Lille', diplomasIssued: 312, certificateExpiresAt: '2027-09-30T00:00:00Z', status: 'ACTIVE' },
    { id: 13, name: 'Lycée Jean Moulin', city: 'Lyon', diplomasIssued: 148, certificateExpiresAt: '2026-12-15T00:00:00Z', status: 'ACTIVE' },
    { id: 12, name: 'Université de Toulouse', city: 'Toulouse', diplomasIssued: 1204, certificateExpiresAt: '2027-06-01T00:00:00Z', status: 'ACTIVE' },
    { id: 11, name: 'IUT de Villeurbanne', city: 'Villeurbanne', diplomasIssued: 596, certificateExpiresAt: '2027-03-20T00:00:00Z', status: 'SUSPENDED' },
    { id: 10, name: 'Université de Lyon', city: 'Lyon', diplomasIssued: 2310, certificateExpiresAt: '2027-11-12T00:00:00Z', status: 'ACTIVE' },
  ],
}