// Get dependencies
const express = require('express');
const db = require('./config/db');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('./models/users');
const postgresStrategy = require('passport-local-postgres')(db.pool);

// Get routes
const index = require('./routes/index');
const health = require('./routes/health');
// Bind routes
const server = express();
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static('public'));
server.use(passport.initialize());
server.use(passport.session());
server.use('/', index);
server.use('/health', health);
// Config passport
passport.use(new LocalStrategy(postgresStrategy.localStrategy));
passport.serializeUser(postgresStrategy.serializeUser);
passport.deserializeUser(postgresStrategy.deserializeUser);
server.post('/',
  passport.authenticate('local', 
    { failureRedirect: '/error', successRedirect: '/success?authorized', session: false }));
// Listen to traffic
const port = process.env.PORT || 1234;
server.listen(port , () => console.log('App listening on port ' + port));