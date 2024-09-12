export async function up(knex) {
  await knex.schema.createTable('organisations', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.specificType('contact_details', 'text[]').notNullable()
    table.text('about')
    table.string('location').notNullable()
    table.string('org_types')
    table.string('image').defaultTo('/images/placeholder-image.webp')
    table.boolean('volunteering_needed').defaultTo(false)
    table.string('method')
    table.string('website')
    table.specificType('donation_type', 'text[]')
    table.boolean('accepting_donations').defaultTo(true)
    table.boolean('urgently_seeking').defaultTo(false)
  })
}

export async function down(knex) {
  await knex.schema.dropTable('organisations')
}
