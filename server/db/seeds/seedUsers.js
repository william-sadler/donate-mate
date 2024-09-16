export async function seed(knex) {
  await knex('users').del()

  await knex('users').insert([
    {
      auth0Id: 'auth0|123',
      name: 'Rebecca',
      email: 'pop@gmail.com',
      org_id: 1,
      is_owner: true,
    },
    {
      auth0Id: 'auth0|456',
      name: 'Fran',
      email: 'berries@gmail.com',
      org_id: 2,
      is_owner: true,
    },
    {
      auth0Id: 'auth0|789',
      name: 'WillKeiraWarkina',
      email: 'team@gmail.com',
      org_id: 3,
      is_owner: true,
    },
  ])
}
