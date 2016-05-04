const express = require('express');
const db = require ('./dbConfig.js')
const app = express();
const port = process.env.PORT || 3000;

const Business = require('./dbModels/businessModel');
const Application = require('./dbModels/applicationModel');
require('./middleware')(app, express)

const server = app.listen(port, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('listening at http://%s:%s', host, port);
});

app.get('/businesses/:name', (req, res) => {
  console.log(req.params.name)
  Business.find({name: req.params.name}, (err, data) => {
    if(err) {
      console.log(err)
      res.sendStatus(404)
    } else {
      res.send(data[0]).sendStatus(200)
    }
  })
})

app.post('/businesses', (req, res) => {
  // console.log(Business)
  var business = new Business(req.body)
  business.save((err, data) => {
    if(err){
      console.log(err)
      res.sendStatus(400)
    } else {
      res.status(201).send(data);
    }
  })
});

app.post('/applications/:businessName', (req, res) => {
  var appInfo = req.body
  appInfo.businessName = req.params.businessName;
  var application = new Application(appInfo)
  application.save((err) => {
    if(err){
      console.log(err)
      res.sendStatus(400)
    } else {
      res.status(201).send({message: "created"});
    }
  })
})