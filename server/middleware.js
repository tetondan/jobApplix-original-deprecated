const app = require('express')
const bodyParser = require('body-parser');

module.exports = (app, express) => {
  app.use(bodyParser.json());
  app.use(express.static(__dirname+'/../client'));
}