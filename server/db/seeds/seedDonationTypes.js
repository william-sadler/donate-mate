/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('donation_types').del()
  await knex('donation_types').insert([
    { id: 1, accepting: true, urgently: false, date: '20/08/2023' },
    { id: 2, accepting: false, urgently: false, date: '21/08/2023' },
    { id: 3, accepting: true, urgently: false, date: '23/08/2023' },
  ])
}
