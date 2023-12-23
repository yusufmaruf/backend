/* v8 ignore start */

import { type Knex } from 'knex'

const tableName = 'users'
export async function up (knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table: Knex.TableBuilder) => {
    table.increments('id').primary()
    table.string('name', 100).notNullable()
    table.string('email', 100).notNullable().unique()
    table.string('password', 100).notNullable()
    table.string('role', 100).notNullable()
  })
}

export async function down (knex: Knex): Promise<void> {
  await knex.schema.dropTable(tableName)
}
/* v8 ignore stop */
