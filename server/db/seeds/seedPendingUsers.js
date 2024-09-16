export async function seed(knex) {
  await knex('pending_users').del()

  await knex('pending_users').insert([
    {
      auth0Id: 'auth0|321',
      name: 'Fran',
      email: 'pop@gmail.com',
      org_id: 1,
    },
    {
      auth0Id: 'auth0|654',
      name: 'Rebecca',
      email: 'berries@gmail.com',
      org_id: 2,
    },
    {
      auth0Id: 'auth0|987',
      name: 'newbie',
      email: 'newbie@gmail.com',
      org_id: 3,
    },
    {
      auth0Id: 'auth0|999',
      name: 'Jatin',
      email: 'devacademy@gmail.co.nz',
      org_id: 18,
    },
    {
      auth0Id: 'auth0|888',
      name: 'David',
      email: 'devacademy@gmail.co.nz',
      org_id: 18,
    },
    {
      auth0Id: 'auth0|777',
      name: 'Gaby',
      email: 'devacademy@gmail.co.nz',
      org_id: 18,
    },
    {
      auth0Id: 'auth0|666',
      name: 'Corina',
      email: 'devacademy@gmail.co.nz',
      org_id: 18,
    },
  ])
}
