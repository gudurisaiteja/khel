module.exports = {
    development: {
      client: 'postgresql',
      connection: {
          host :'10.218.0.16',
        database: 'KhelAK',
        user: 'postgres',
        password: 'postgres',
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
        host :'10.218.0.16',
        database: 'khel',
        user: 'postgres',
        password: 'postgres',
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
      }
    },
  
    production: {
      client: 'postgresql',
      connection: {
  
          host :'10.218.0.16',
        database: 'khel',
        user: 'postgres',
        password: 'postgres',
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
      }
    },
  };