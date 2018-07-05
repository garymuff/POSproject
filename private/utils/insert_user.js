const db = require('../config/db');
const bcrypt = require('bcrypt');

const args = require('yargs')
  .option('u', {
    describe: 'Username of the user',
  })
  .option('p', {
    describe: 'Password of the user',
  })
  .option('t', {
    describe: 'Privilege {admin|user}',
  })
  .usage('Usage: node $0 --kind [commission|rental] --from [datetime] --to [datetime]')
  .example(
    'node $0 --u Tom --p Cruise --t user'
  )
  .demandOption(['u', 'p', 't'])
  .help().argv;

async function execute() {
	const user = args.u;
	const pass = args.p;
	const type = args.t;
	// Encrypt password
	const salt = 10;
	
	bcrypt.hash(pass, salt, async function(err, hash) {
		const sql = `INSERT INTO users VALUES(NEXTVAL('users_id_seq'),'${user}', '${hash}', '${type}');`
		try{
      await db.query(sql);
      console.log("Script finished.\n")
      process.exit(0);
    } catch(err){
      console.log("Script failed.\n", err.stack)
      process.exit(1);
    }
	});
};

execute();
