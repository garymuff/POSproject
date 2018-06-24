const db = require('../config/db');

module.exports = {
	authenticate: async function(username, password, done) {
      console.log("Authenticating...");
      const query = await db.query("SELECT username, password FROM users;");
      const auth = query.rows[0];
      
      if(auth.username === username){
      	if(auth.password == password){
      		return done(null, true);
      	}
      	return done(null, false);
      }
      return done(null, false);
  	},

  	serializeUser: function(){},
  	deserializeUser: function(){},
}