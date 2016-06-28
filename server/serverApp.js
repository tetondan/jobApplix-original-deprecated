'use strict'

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require ('./dbConfig.js')
const Application = require('./dbModels/applicationModel');
require('./middleware')(app, express)

const server = app.listen(port, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('listening at http://%s:%s', host, port);
});

app.get('/apply/:business', function(req, res){
  res.redirect('/#' + req.url);
})