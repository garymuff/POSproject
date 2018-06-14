// Database
const { Client } = require('pg');
const connectionString = process.env.DATABASE_URL || 
	"postgres://admin:SuperPass@localhost/db";
const client = new Client({
  connectionString: connectionString,
});

client.connect();

async function query(sql) {
    const res = await client.query(sql);
  	console.log(res.rows[0]);
  	return res;
};

module.exports = {query};