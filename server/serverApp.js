const express = require('express');
const db = require ('./dbConfig.js')
const app = express();
const port = process.env.PORT || 3000;

var Business = require('./dbModels/businessModel.js');
const bodyParser = require('body-parser');

const server = app.listen(port, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('listening at http://%s:%s', host, port);
});
app.use(bodyParser.json());
app.get('/', (req,res) => {
  res.send('hello')
});

app.post('/businesses', (req, res) => {
  // console.log(Business)
  var business = new Business(req.body)
  business.save((err, data) => {
    if(err){
      console.log(err)
      res.sendStatus(400)
    } else {
      res.sendStatus(201).send(data);
    }
  })
});