import dotenv from 'dotenv';

dotenv.config();

const config = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'demo_wallet_db',
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
