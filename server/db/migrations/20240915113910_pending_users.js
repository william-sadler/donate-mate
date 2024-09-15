export async function up(knex) {
  await knex.schema.createTable('pending_users', (table) => {
    table.string('auth0Id').primary()
    table.string('name')
    table.string('email')
    table.integer('org_id')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('pending_users')
}
