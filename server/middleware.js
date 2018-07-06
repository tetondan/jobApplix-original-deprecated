'use strict'

const app = require('express')
const bodyParser = require('body-parser');
const session = require('express-session');
const business = require('./routes/business.js');
const apply = require('./routes/apply.js')
const MongoStore = require('connect-mongo')(session);

module.exports = ( app, express ) => {
  console.log(process.env)
  app.use( session( {
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: null},
    store: new MongoStore({
      url: process.env.CUSTOMCONNSTR_MONGOLAB_URI_JOBAPPLIX || 'mongodb://localhost/jobApplix'
    })
  }));
  app.use(bodyParser.json());
  app.use(express.static(__dirname+'/../client'));
  app.use('/api/businesses',business);
  app.use('/api', apply);
}