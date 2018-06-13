// Database
const { Client } = require('pg');
const connectionString = process.env.DATABASE_URL || 
	"postgres://admin:SuperPass@localhost/db";
const client = new Client({
  connectionString: connectionString,
});

async function query(sql) {
    await client.connect();
    client.query(sql)
  		  .then(res => console.log(res.rows[0]))
  		  .catch(e => console.error(e.stack))
};

module.exports = {query};