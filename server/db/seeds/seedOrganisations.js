export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('organisations').del()

  // Inserts seed entries
  await knex('organisations').insert([
    {
      id: 1,
      name: 'Hospice Cuba Street',
      contact_details: '123 Cuba St, Wellington',
      about: 'Providing essential services to the community.',
      longitude: 174.7762,
      latitude: -41.2924,
      org_types: 'Charity',
      volunteering_needed: true,
      method: 'Email',
    },
    {
      id: 2,
      name: 'Salvation Army Miramar',
      contact_details: '50 Miramar Ave, Wellington',
      about: 'Supporting those in need.',
      longitude: 174.8287,
      latitude: -41.3137,
      org_types: 'Non-Profit',
      volunteering_needed: false,
      method: 'Phone',
    },
    {
      id: 3,
      name: 'Aro Valley Opshop',
      contact_details: 'Aro St, Wellington',
      about: 'Affordable goods and support for the local community.',
      longitude: 174.7668,
      latitude: -41.2973,
      org_types: 'Charity',
      volunteering_needed: true,
      method: 'In-Person',
    },
  ])
}
