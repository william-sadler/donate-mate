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
    // id: 1
    // name: 'Hospice Cuba Street'

    {
      name: 'Clothes',
      accepting: true,
      urgently_seeking: true,
      organisation_id: 1,
      date: `${date}`,
    },
    {
      name: 'Furniture',
      accepting: true,
      urgently_seeking: true,
      organisation_id: 1,
      date: `${date}`,
    },

    // id: 2
    // name: 'Salvation Army Miramar'

    {
      name: 'Clothes',
      accepting: true,
      urgently_seeking: false,
      organisation_id: 2,
      date: `${date}`,
    },
    {
      name: 'Food',
      accepting: true,
      urgently_seeking: false,
      organisation_id: 2,
      date: `${date}`,
    },

    // id: 3
    // name: 'Whiskers & Wonders'

    {
      name: 'Pet care',
      accepting: true,
      urgently_seeking: true,
      organisation_id: 3,
      date: `${date}`,
    },
    {
      name: 'Household goods',
      accepting: true,
      urgently_seeking: false,
      organisation_id: 3,
      date: `${date}`,
    },
    {
      name: 'Clothes',
      accepting: false,
      urgently_seeking: false,
      organisation_id: 3,
      date: `${date}`,
    },

    // id: 4
    // name: 'Aro Valley Opshop'

    {
      name: 'Clothes',
      accepting: true,
      urgently_seeking: false,
      organisation_id: 4,
      date: `${date}`,
    },
    {
      name: 'Household goods',
      accepting: true,
      urgently_seeking: false,
      organisation_id: 4,
      date: `${date}`,
    },

    // id: 5
    // name: 'The Koha Shed Wellington'

    {
      name: 'Clothes',
      accepting: true,
      urgently_seeking: false,
      organisation_id: 5,
      date: `${date}`,
    },
    {
      name: 'Furniture',
      accepting: true,
      urgently_seeking: false,
      organisation_id: 5,
      date: `${date}`,
    },
    {
      name: 'Food',
      accepting: true,
      urgently_seeking: false,
      organisation_id: 5,
      date: `${date}`,
    },

    // id: 6
    // name: 'Dress for Success Wellington'

    {
      name: 'Clothes',
      accepting: true,
      urgently_seeking: false,
      organisation_id: 6,
      date: `${date}`,
    },
    {
      name: 'Accessories',
      accepting: true,
      urgently_seeking: false,
      organisation_id: 6,
      date: `${date}`,
    },

    // id: 7
    // name: 'Wellington SPCA'

    {
      name: 'Pet care',
      accepting: true,
      urgently_seeking: false,
      organisation_id: 7,
      date: `${date}`,
    },
    {
      name: 'Food',
      accepting: true,
      urgently_seeking: false,
      organisation_id: 7,
      date: `${date}`,
    },
    {
      name: 'Appliances',
      accepting: true,
      urgently_seeking: false,
      organisation_id: 7,
      date: `${date}`,
    },

    // id: 8
    // name: 'Salvation Army Wellington'

    {
      name: 'Clothes',
      accepting: true,
      urgently_seeking: false,
      organisation_id: 8,
      date: `${date}`,
    },
    {
      name: 'Food',
      accepting: true,
      urgently_seeking: false,
      organisation_id: 8,
      date: `${date}`,
    },
    {
      name: 'Furniture',
      accepting: true,
      urgently_seeking: false,
      organisation_id: 8,
      date: `${date}`,
    },

    // id: 9
    // name: 'Wellington City Mission'

    {
      name: 'Food',
      accepting: true,
      urgently_seeking: false,
      organisation_id: 9,
      date: `${date}`,
    },
    {
      name: 'Clothes',
      accepting: true,
      urgently_seeking: false,
      organisation_id: 9,
      date: `${date}`,
    },

    // id: 10
    // name: 'Vinnies Wellington'

    {
      name: 'Clothes',
      accepting: true,
      urgently_seeking: false,
      organisation_id: 10,
      date: `${date}`,
    },
    {
      name: 'Furniture',
      accepting: true,
      urgently_seeking: false,
      organisation_id: 10,
      date: `${date}`,
    },
    {
      name: 'Food',
      accepting: true,
      urgently_seeking: false,
      organisation_id: 10,
      date: `${date}`,
    },
    {
      name: 'Household goods',
      accepting: true,
      urgently_seeking: false,
      organisation_id: 10,
      date: `${date}`,
    },

    // id: 11
    // name: "Wellington Women's Refuge"

    {
      name: 'Clothes',
      accepting: true,
      urgently_seeking: false,
      organisation_id: 11,
      date: `${date}`,
    },
    {
      name: 'Food',
      accepting: true,
      urgently_seeking: false,
      organisation_id: 11,
      date: `${date}`,
    },
    {
      name: 'Toiletries',
      accepting: true,
      urgently_seeking: false,
      organisation_id: 11,
      date: `${date}`,
    },

    // id: 12
    // name: 'Newtown Community & Cultural Centre'

    {
      name: 'Food',
      accepting: true,
      urgently_seeking: false,
      organisation_id: 12,
      date: `${date}`,
    },
    {
      name: 'Clothes',
      accepting: true,
      urgently_seeking: false,
      organisation_id: 12,
      date: `${date}`,
    },

    // id: 13
    // name: 'Kaibosh Wellington'

    {
      name: 'Food',
      accepting: true,
      urgently_seeking: false,
      organisation_id: 13,
      date: `${date}`,
    },

    // id: 14
    // name: 'The Free Store'

    {
      name: 'Food',
      accepting: true,
      urgently_seeking: false,
      organisation_id: 14,
      date: `${date}`,
    },

    // id: 15
    // name: 'Wellington Night Shelter'

    {
      name: 'Clothes',
      accepting: true,
      urgently_seeking: false,
      organisation_id: 15,
      date: `${date}`,
    },
    {
      name: 'Linen & Bedding',
      accepting: true,
      urgently_seeking: false,
      organisation_id: 15,
      date: `${date}`,
    },
    {
      name: 'Food',
      accepting: true,
      urgently_seeking: false,
      organisation_id: 15,
      date: `${date}`,
    },

    // id: 16
    // name: 'Soup Kitchen Wellington'

    {
      name: 'Food',
      accepting: true,
      urgently_seeking: false,
      organisation_id: 16,
      date: `${date}`,
    },

    // id: 17
    // name: 'Soup Kitchen Wellington'

    {
      name: 'Food',
      accepting: true,
      urgently_seeking: false,
      organisation_id: 17,
      date: `${date}`,
    },
  ])
}
