/* eslint-disable @typescript-eslint/dot-notation */
/* v8 ignore start */

import type { Knex } from 'knex'
import dotenv from 'dotenv'
dotenv.config()

const config: Record<string, Knex.Config> = {
  development: {
    client: 'postgresql',
    // eslint-disable-next-line @typescript-eslint/dot-notation
    connection: process.env['DATABASE_URL'],
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  production: {
    client: 'postgresql',
    connection: process.env['DATABASE_URL'],
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
}

module.exports = config

/* v8 ignore stop */
