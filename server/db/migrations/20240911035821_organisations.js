export async function up(knex) {
  await knex.schema.createTable('organisations', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.string('contact_details').notNullable()
    table.text('about')
    table.integer('longitude')
    table.integer('latitude')
    table.string('org_types')
    table.string('image')
    table.boolean('volunteering_needed').defaultTo(false)
    table.string('method')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('organisations')
}
