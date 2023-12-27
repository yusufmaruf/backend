/* eslint-disable @typescript-eslint/dot-notation */
import type { Knex } from 'knex'
import dotenv from 'dotenv'
dotenv.config()

console.log(process.env['DATABASE_URL'])

const config: Record<string, Knex.Config> = {
  development: {
    client: 'pg',
    connection: process.env['DATABASE_URL'],
    pool: {
      min: 0,
      max: 1
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  production: {
    client: 'pg',
    connection: process.env['DATABASE_URL'],
    pool: {
      min: 0,
      max: 1
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
}

module.exports = config
