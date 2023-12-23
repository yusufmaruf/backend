/* v8 ignore start */
import { type Knex } from 'knex'
import bcrypt from 'bcrypt'
const tableName = 'users'

export async function seed (knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(tableName).del()
  const hashedPasswordAdmin = await bcrypt.hash('admin', 10)
  const hashedPasswordSuperAdmin = await bcrypt.hash('superadmin', 10)

  // Inserts seed entries
  await knex(tableName).insert([
    {

      name: 'Admin',
      email: 'admin@admin',
      password: hashedPasswordAdmin,
      role: 'admin'
    },
    {

      name: 'Super Admin',
      email: 'superadmin@admin',
      password: hashedPasswordSuperAdmin,
      role: 'superadmin'
    }
  ])
};
/* v8 ignore stop */
