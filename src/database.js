require('dotenv').config();

// Postgresql
const { Client } = require('pg');

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});


// Conección a Postgresql
async function connectToPostgresql () {
  try {
    await client.connect();
    console.log(" > Postgres connected");
    return true;

  } catch (error) {
    console.log(" > Error when trying to connect to Postgres -> " + error);
    return false;

  }
}


module.exports = {
  connectToPostgresql
};
