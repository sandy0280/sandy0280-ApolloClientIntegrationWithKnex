import type { Knex } from "knex"

interface IKnexConfig {
  [key: string]: Knex.Config;
}

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      database: 'my_db',
      user: 'postgres',
      password: '1234',
      filename: "/home/ubox35/Desktop/apollo/src/database/dev.sqlite3"
    },
    debug: true,
    useNullAsDefault: true,
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "postgres",
      password: "1234"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};

module.exports = config;
