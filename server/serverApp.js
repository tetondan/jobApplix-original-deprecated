const express = require('express');
// const db = require ('./dbControllers.js')
const app = express();
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('listening at http://%s:%s', host, port);
});

app.get('/', (req,res) => {
  res.send('hello')
})