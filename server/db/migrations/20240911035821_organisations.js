export async function up(knex) {
  await knex.schema.createTable('organisations', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.string('contact_email')
    table.string('contact_number')
    table.string('location').notNullable()
    table.text('about')
    table.float('longitude')
    table.float('latitude')
    table.string('org_types')
    table.string('image').defaultTo('/images/placeholder-image.webp')
    table.boolean('volunteering_needed').defaultTo(false)
    table.string('donation_method')
    table.string('website')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('organisations')
}
