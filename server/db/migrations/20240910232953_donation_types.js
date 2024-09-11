/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  return knex.schema.createTable('donation_types', (table) => {
    table.increments('id')
    table.string('name')
    table.boolean('accepting')
    table.boolean('urgently_seeking')
    table.integer('organisation_id')
    table.string('date')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('donation_types')
}
