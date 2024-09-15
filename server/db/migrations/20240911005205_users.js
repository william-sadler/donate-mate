export async function up(knex) {
  await knex.schema.createTable('users', (table) => {
    table.string('auth0Id').primary()
    table.string('name')
    table.string('email')
    table.integer('org_id')
    table.boolean('is_owner')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('users')
}
