// Get dependencies
const express = require('express');
const db = require('./config/db');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportConfig = require('./config/passport')(db.pool);
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');
// Config passport
passport.use(new LocalStrategy(passportConfig.localStrategy));
passport.serializeUser(passportConfig.serializeUser);
passport.deserializeUser(passportConfig.deserializeUser);
// Get routes
const health = require('./routes/health');
const home = require('./routes/home');
const query = require('./routes/query');
// Bind routes
const server = express();
server.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(passport.initialize());
server.use(passport.session());
server.use('/health', health);
server.use('/home', home);
server.use('/query', query);
// GET
server.all('/', (req, res) => {
  const user = req.user;
  console.log("user: " + user);
  if(!user){
    res.redirect('/login');
  } else {
    res.redirect('/home');
  }
});
// Login
server.get('/login', (req, res) => {res.sendFile(path.resolve('../public/login.html'))});
server.post('/login',
  passport.authenticate('local', 
    { failureRedirect: '/login', successRedirect: '/', session: true }));
// Logout
server.get('/logout', (req, res) =>{
    req.logout();
    res.redirect('/');
});
// Serve static content
server.use(express.static(path.resolve('../public')));
// Listen to traffic
const port = process.env.PORT || 1234;
server.listen(port , () => console.log('App listening on port ' + port));