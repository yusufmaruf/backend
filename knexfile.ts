/* v8 ignore start */

import type { Knex } from 'knex'

const config: Record<string, Knex.Config> = {
  development: {
    client: 'postgresql',
    connection: {
      port: 5430,
      database: 'car',
      user: 'postgres',
      password: 'bismillah'
    },
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
    connection: {
      port: 5430,
      database: 'car',
      user: 'postgres',
      password: 'bismillah'
    },
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
