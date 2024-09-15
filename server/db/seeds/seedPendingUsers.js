export async function seed(knex) {
  await knex('pending_users').del()

  await knex('pending_users').insert([
    {
      auth0Id: 'auth0|321',
      name: 'Fran',
      email: 'pop@gmail.com',
      org_id: 1,
      is_owner: false,
    },
    {
      auth0Id: 'auth0|654',
      name: 'Rebecca',
      email: 'berries@gmail.com',
      org_id: 2,
      is_owner: false,
    },
    {
      auth0Id: 'auth0|987',
      name: 'newbie',
      email: 'newbie@gmail.com',
      org_id: 3,
      is_owner: false,
    },
  ])
}
