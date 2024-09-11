/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('donation_names').del()

  // Seeding Donation Types
  await knex('donation_names').insert([
    { id: 1, name: 'Furniture' },
    { id: 2, name: 'Books' },
    { id: 3, name: 'Clothes' },
    { id: 4, name: 'Accessories' },
    { id: 5, name: 'Food' },
    { id: 6, name: 'Kitchen' },
    { id: 7, name: 'Volunteering' },
    { id: 8, name: 'Appliances' },
    { id: 9, name: 'Pet care' },
    { id: 10, name: 'Linen & Bedding' },
    { id: 11, name: 'Household goods' },
    { id: 12, name: 'Baby care' },
    { id: 13, name: 'Toiletries' },
    { id: 14, name: 'Hygiene' },
    { id: 15, name: 'Electrical goods' },
  ])
}
