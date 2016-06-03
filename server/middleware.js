const app = require('express')
const bodyParser = require('body-parser');
const session = require('express-session')

module.exports = (app, express) => {
  //using body parser allows us to get the body out of the reguest object
  app.use(bodyParser.json());
  //serves the index page and all of the front end code.
  app.use(express.static(__dirname+'/../client'));
}