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
      urgently_seeking: true,
      organisation_id: 1,
      date: `${date}`,
    },
    {
      id: 2,
      name: 'Furniture',
      accepting: false,
      urgently_seeking: false,
      organisation_id: 1,
      date: `${date}`,
    },
    {
      id: 3,
      name: 'Food',
      accepting: true,
      urgently_seeking: false,
      organisation_id: 1,
      date: `${date}`,
    },
    {
      id: 4,
      name: 'Clothes',
      accepting: true,
      urgently_seeking: true,
      organisation_id: 2,
      date: `${date}`,
    },
    {
      id: 5,
      name: 'Furniture',
      accepting: false,
      urgently_seeking: false,
      organisation_id: 2,
      date: `${date}`,
    },
    {
      id: 6,
      name: 'Food',
      accepting: true,
      urgently_seeking: false,
      organisation_id: 2,
      date: `${date}`,
    },
    {
      id: 7,
      name: 'Clothes',
      accepting: true,
      urgently_seeking: true,
      organisation_id: 3,
      date: `${date}`,
    },
    {
      id: 8,
      name: 'Furniture',
      accepting: false,
      urgently_seeking: false,
      organisation_id: 3,
      date: `${date}`,
    },
    {
      id: 9,
      name: 'Food',
      accepting: true,
      urgently_seeking: false,
      organisation_id: 3,
      date: `${date}`,
    },
  ])
}
