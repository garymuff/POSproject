// Import
const express = require('./public/config/express');
const db = require('./public/config/db');
const passport = require('./public/config/passport');
// Initialize
const app = express();
app.use(passport.initialize());
app.use(passport.session());
// DB test
db.query("SELECT * from users;");
// Routes
app.get('/', (req, res) => res.sendFile(__dirname + '/public/login.html'));
app.get('/health', (req, res) => res.send('Server up and running!'));
app.get('/success', (req, res) => res.sendFile(__dirname + '/public/index.html'));
app.get('/error', (req, res) => res.sendFile(__dirname + '/public/login.html'));
// Dependencies
app.use(express.static("public"));
// Server up
app.listen(process.env.PORT || 1234, () => console.log('App listening on port 1234!'));
// Authenticate
app.post('/',
  passport.authenticate('local', { failureRedirect: '/error' }),
  function(req, res) {
    res.redirect('/success?username');
  });