'use strict'

const app = require('express')
const bodyParser = require('body-parser');
const session = require('express-session');
const business = require('./routes/business.js');
const apply = require('./routes/apply.js')
const MongoStore = require('connect-mongo')(session);

module.exports = (app, express) => {
  //TODO!! implement session
  app.use(session({
    secret: 'JOBAPPLiX_420_6969',
    resave: true,
    saveUninitialized: true,
    cookie: {},
    store: new MongoStore({
    url:"mongodb://localhost/jobApplix"
    //other advanced options
  })
  }));
  //using body parser allows us to get the body out of the reguest object
  app.use(bodyParser.json());
  //serves the index page and all of the front end code.
  app.use(express.static(__dirname+'/../client'));
  //serve the following routes:
  app.use('/api',business);
  app.use('/api', apply);
}