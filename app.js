const express = require('express');
require('dotenv').config();
require('./config/sync_config/config');
const models = require('./models');
require('./global_functions');
const userController = require('./controllers/UsersController');
const eventController = require('./controllers/EventsController');
const sessionController = require('./controllers/SessionsController');
const bodyParser = require('body-parser');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Users = require('./models').Users;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = CONFIG.jwt_encryption;

passport.use(
  new JwtStrategy(opts, async function(jwt_payload, done) {
    let err, user;
    [err, user] = await to(Users.findByPk(jwt_payload.user_id));

    if (err) return done(err, false);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  }),
);

app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  );
  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With, content-type, Authorization, Content-Type',
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

models.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

if (CONFIG.app === 'dev') {
  models.sequelize.sync();
}

app.post('/users', userController.create);
app.put(
  '/users',
  passport.authenticate('jwt', { session: false }),
  userController.update,
);

app.get('/users',
  passport.authenticate('jwt', { session: false }),
  userController.readUser,
);

app.get(
  '/getUser',
  passport.authenticate('jwt', { session: false }),
  userController.getCurrentUser,
);
app.post('/login', userController.login);
app.post(
  '/events',
  passport.authenticate('jwt', { session: false }), 
  eventController.create,
  );
app.put('/events', eventController.update);
app.get('/events', eventController.readEvent);
app.delete('/events', eventController.deleteEvent);
app.get(
  '/getUser',
  passport.authenticate('jwt',{session:false}),
  eventController.readEventsForUser,
  );
  app.get(
    '/getEventsUpcoming',
    eventController.readEventsUpcoming,
  );
  
  app.post(
    '/sessions',
    passport.authenticate('jwt', { session: false }),
    sessionController.create,
  );
  
  app.put('/sessions', sessionController.update);
  app.get('/sessions', sessionController.readSession);
  app.delete('/sessions', sessionController.deleteSession);
  app.get(
    '/getSessions',
    passport.authenticate('jwt', { session: false }),
    sessionController.readSessionsForUser,
  );
  
  app.get(
    '/getSessionsWithTrainerInfo',
    passport.authenticate('jwt', { session: false }),
    sessionController.readSessionsWithTrainerInfo,
    );
module.exports = app;
