require('dotenv').config();

const db = require('knex')({
  client: 'pg',
  version: '7.2.0',
  connection: {
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    ssl: { rejectUnauthorized: false }
  },
});

module.exports = db;
