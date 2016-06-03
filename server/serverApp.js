const express = require('express');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 3000;
const db = require ('./dbConfig.js')
const Business = require('./dbModels/businessModel');
const Application = require('./dbModels/applicationModel');
const Auth = require('./auth');
require('./middleware')(app, express)

const server = app.listen(port, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('listening at http://%s:%s', host, port);
});
//retreives the business info from the database
app.get('/businesses/:name', (req, res) => {
  Business.find({name: req.params.name}, (err, data) => {
    if(err) {
      console.log(err)
      res.sendStatus(404)
    } else {
      res.send(data[0]).sendStatus(200)
    }
  })
})
//gets all of the applications associated with the business
//TO DO: add security only allowing a user to retreive applications if they are signed in as that user
app.get('/applications/:businessName', (req,res) => {
  Application.find({businessName: req.params.businessName}, (err,data) => {
    if(err){
      console.log(err);
      res.status(404)
    } else if ( data.length === 0){
      res.status(200).send({message: 'No applications'})
    } else {
      res.status(200).send(data);
    }
  })
})


//create a new business
app.post('/businessSignup', (req, res) => {
  var businessObj = req.body
  Business.findOne({username: businessObj.username}, (err, results) => {
    console.log('results:', results)
    if(results !== null){
      res.status(401).send("Business name already taken")
    } else {
      Auth.setPass(businessObj.password)
        .then((passHash) => {
          businessObj.password = passHash;
          var business = new Business(businessObj);
          business.save((err, data) => {
            if(err){
              console.log(err)
              res.status(400)
            } else {
              res.status(201).send(data);
            }
          })
        })
        .catch((err) => {
          res.status(401).send(err)
        })      
    }
  })
});

app.post('/businessLogin', (req, res) => {
  var info = req.body;
  var sess = req.session;
  Business.findOne({username: info.username}, (err, results) => {
    if(results === null){
      res.status(404).send("Incorrect Username or Password 1")
    } else {
      Auth.logIn(info.password, results.password)
        .then((isPass) => {
          if(isPass === true){
            results.password = '';
            results.__v = '';
            console.log(results)
            res.status(200).send(results)
          } else {
            res.status(404).send("Incorrect Username or Password 2")
          }
        })
        .catch((err) => {
          res.status(404).send("Incorrect Username or Password 3")
        })
    }
  })
})

//submit an application to a business
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