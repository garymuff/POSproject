// Setup Express
const express = require('express');
const app = express();
// Get database
const db = require('./public/config/db')
db.query("SELECT * from users");
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.sendFile(__dirname + '/public/login.html'));

app.use(express.static('public'));
const port = process.env.PORT || 1234;
app.listen(port , () => console.log('App listening on port ' + port));
// Setup passport
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

app.get('/success', (req, res) => res.sendFile(__dirname + '/public/index.html'));
app.get('/error', (req, res) => res.sendFile(__dirname + '/public/login.html'));

passport.serializeUser(function(user, done) {
  done(null, true);
});

passport.deserializeUser(function(user, done) {
  done(null, true);
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
  	{ failureRedirect: '/error', successRedirect: '/success' }));