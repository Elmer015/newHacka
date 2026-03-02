const { Pool } = require('pg');
require('dotenv').config();

// prefer a full connection string (Railway provides DATABASE_URL)
// fall back to individual vars (used in docker-compose/local dev)
const poolConfig = {};
if (process.env.DATABASE_URL) {
  poolConfig.connectionString = process.env.DATABASE_URL;
  // when running in production platforms like Railway we need SSL
  // and rejectUnauthorized false to avoid certificate errors
  poolConfig.ssl = { rejectUnauthorized: false };
} else {
  poolConfig.host = process.env.DB_HOST || 'localhost';
  poolConfig.port = process.env.DB_PORT || 5432;
  poolConfig.user = process.env.DB_USER || 'postgres';
  poolConfig.password = process.env.DB_PASSWORD || 'postgres';
  poolConfig.database = process.env.DB_NAME || 'payment_db';
}
const pool = new Pool(poolConfig);

pool.on('connect', () => console.log('✅ Connected to Postgres'));

module.exports = pool;