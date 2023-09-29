import dotenv from 'dotenv';

dotenv.config();

const config = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: __dirname + '/migrations',
    },
    seeds: {
        directory: __dirname + '/src/db/seeds',
      },
  },
  production: {
    client: 'mysql2',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: __dirname + '/migrations',
    },
    seeds: {
        directory: __dirname + '/src/db/seeds',
      },
  },
};

export default config;
