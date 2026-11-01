// DONNÉES FICTIVES – à remplacer par l'API FastAPI (phase 7)
export const mockInstitutions = [
  { id: 14, name: 'Université de Lille', city: 'Lille', contactEmail: 'contact@univ-lille.fr', diplomasIssued: 312, certificateExpiresAt: '2027-09-30T00:00:00Z', status: 'ACTIVE' },
  { id: 13, name: 'Lycée Jean Moulin', city: 'Lyon', contactEmail: 'secretariat@lycee-moulin.fr', diplomasIssued: 148, certificateExpiresAt: '2026-12-15T00:00:00Z', status: 'ACTIVE' },
  { id: 12, name: 'Université de Toulouse', city: 'Toulouse', contactEmail: 'contact@univ-toulouse.fr', diplomasIssued: 1204, certificateExpiresAt: '2027-06-01T00:00:00Z', status: 'ACTIVE' },
  { id: 11, name: 'IUT de Villeurbanne', city: 'Villeurbanne', contactEmail: 'direction@iut-villeurbanne.fr', diplomasIssued: 596, certificateExpiresAt: '2027-03-20T00:00:00Z', status: 'SUSPENDED' },
  { id: 10, name: 'Université de Lyon', city: 'Lyon', contactEmail: 'contact@univ-lyon.fr', diplomasIssued: 2310, certificateExpiresAt: '2027-11-12T00:00:00Z', status: 'ACTIVE' },
  { id: 9, name: 'Université de Bordeaux', city: 'Bordeaux', contactEmail: 'contact@univ-bordeaux.fr', diplomasIssued: 1870, certificateExpiresAt: '2027-02-08T00:00:00Z', status: 'ACTIVE' },
]

export const mockMyInstitution = {
  name: 'Université de Lyon',
  city: 'Lyon',
  contactEmail: 'contact@univ-lyon.fr',
  status: 'ACTIVE',
  certificate: {
    status: 'VALID',
    subject: 'CN=Université de Lyon, O=Université de Lyon, C=FR',
    issuer: 'CN=DigiVerify Root CA',
    validFrom: '2025-11-12T00:00:00Z',
    validTo: '2027-11-12T00:00:00Z',
    fingerprint: '3A:9F:C1:07:5B:E2:88:4D:6A:10:F3:9C:B7:21:0E:D5',
  },
}