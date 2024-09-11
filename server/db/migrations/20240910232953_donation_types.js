/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  return knex.schema.createTable('donation_types', (table) => {
    table.increments('id')
    table.integer('furniture_id')
    table.integer('books_id')
    table.integer('clothes_id')
    table.integer('accessories_id')
    table.integer('food_id')
    table.integer('kitchen_id')
    table.integer('volunteering_id')
    table.integer('appliances_id')
    table.integer('pet_care_id')
    table.integer('linen_bedding_id')
    table.integer('household_goods_id')
    table.integer('baby_care_id')
    table.integer('toiletries_id')
    table.integer('hygiene_id')
    table.integer('electrical_goods_id')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('donation_types')
}
