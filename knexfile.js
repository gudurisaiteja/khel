// Update with your config settings.

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
        host :'localhost',
      database: 'khel',
      user: 'postgres',
      password: 'Welcome2ggk',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: __dirname + '/seeds',
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
     host :'localhost',
      database: 'khel',
      user: 'postgres',
      password: 'Welcome2ggk',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
  host :'localhost',
      database: 'khel',
      user: 'postgres',
      password: 'Welcome2ggk',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
