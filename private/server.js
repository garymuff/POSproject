// Get dependencies
const express = require('express');
const db = require('./config/db');
const bodyParser = require('body-parser');
// Get routes
const health = require('./routes/health');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', index);
app.use('/health', health);

app.get('/', (req, res) => res.sendFile('login.html'));

const port = process.env.PORT || 1234;
app.listen(port , () => console.log('App listening on port ' + port));

// Setup passport
const passport = require('passport');
app.use(passport.initialize());
app.get('/success', (req, res) => {
	const message = req._parsedOriginalUrl.query;
	if(message === "authorized"){
		res.sendFile(__dirname + '/public/index.html');
	} else {
		res.send("unauthorized");
	}
});
app.get('/error', (req, res) => res.sendFile(__dirname + '/public/login.html'));
app.post('/query', async (req, res) => {
	const sku = req.body.sku;
	const sql = "SELECT sku, name, price, quantity FROM inventory WHERE sku =\'"+ sku +"\';" 
	const query = await db.query(sql);
	console.log(query.rows[0]);
	res.send(query.rows[0]);
});

// Authenticate with passport
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  async function(username, password, done) {
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
  }
));

app.post('/',
  passport.authenticate('local', 
  	{ failureRedirect: '/error', successRedirect: '/success?authorized', session: false }));