/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('donation_types').del()

  const date = new Date().getTime()

  // Seeding Donation Types
  await knex('donation_types').insert([
    {
      id: 1,
      name: 'Clothes',
      accepting: true,
      urgently_needed: true,
      organisation_id: 1,
      date: `${date}`,
    },
    {
      id: 2,
      name: 'Furniture',
      accepting: false,
      urgently_needed: false,
      organisation_id: 1,
      date: `${date}`,
    },
    {
      id: 3,
      name: 'Food',
      accepting: true,
      urgently_needed: false,
      organisation_id: 1,
      date: `${date}`,
    },
  ])
}
