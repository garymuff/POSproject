// Dependencies
const { Pool } = require('pg');
// Setup connection string
const connectionString = process.env.DATABASE_URL || 
	"postgres://admin:SuperPass@localhost/db";
const pool = new Pool({
  connectionString: connectionString,
})
// Detect errors
pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
})

async function query(sql) {
  const client = await pool.connect();
  const query = await client.query(sql);
  console.log("Query: ", query.rows[0]);
  client.release();
  return query;
};

module.exports = {pool, query};