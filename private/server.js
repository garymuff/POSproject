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
const home = require('./routes/home');
const inventory = require('./routes/inventory');
const query = require('./routes/query');
const orders = require('./routes/orders');
const health = require('./routes/health');
const charge = require('./routes/charge');
// Bind routes
const server = express();
server.use(function(req, res, next) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});
server.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(passport.initialize());
server.use(passport.session());
server.use('/home', home);
server.use('/inventory', inventory);
server.use('/orders', orders);
server.use('/query', query);
server.use('/health', health);
server.use('/charge', charge);
// GET
server.get('/', (req, res) => {
  const user = req.user;
  if(!user){
    console.log("Access Denied. Redirecting...")
    res.redirect('/login');
  } else {
    res.redirect('/home');
  }
});
// Login
server.get('/login', (req, res) => {
  console.log(req.query);
  if(req.query.error === 'unauthorized'){
    res.sendFile(path.join(__dirname, '../public/login_error.html'))
  } else {
    res.sendFile(path.join(__dirname, '../public/login.html'))
  }
  
});
server.post('/login',
  passport.authenticate('local', 
    { failureRedirect: '/login?error=unauthorized', successRedirect: '/', session: true }));
// Logout
server.get('/logout', (req, res) =>{
    req.logout();
    res.redirect('/');
});
// Serve static content
server.use(express.static(path.join(__dirname, '../public')));
// Listen to traffic
const port = process.env.PORT || 1234;
server.listen(port , () => console.log('App listening on port ' + port));