/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  return knex.schema.createTable('donation_names', (table) => {
    table.increments('id')
    table.string('name')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('donation_names')
}
