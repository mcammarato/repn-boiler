const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const apiRoute = require('./routes/api');
// const { Pool } = require('pg');

app.use(cors());

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// HTTP Logs
app.use(morgan('short'));

// Adventure Works API
app.use('/api/v1', apiRoute);

/*
Example of establishing a connection to 
postgres using the native drivers
Knex is a better option

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDB,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  max: 20,
});

app.get('/get_address', (req, res) => {
  const addresses = [];
  pool.query('SELECT * FROM person.address', (err, results) => {
    results.rows.forEach((value) => {
      const address = {};
      address.id = value.addressid;
      address.addressline1 = value.addressline1;
      addresses.push(address);
    });
    res.send(JSON.stringify(addresses));
  });
});
*/

// Parse body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HTTP Logs
app.use(morgan('short'));

// Server
app.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT}`)); // eslint-disable-line
