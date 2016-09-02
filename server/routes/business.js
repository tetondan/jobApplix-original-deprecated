'use strict'
const CustomApp = require('../dbModels/customApplication')
const Application = require('../dbModels/applicationModel')
const Business = require('../dbModels/businessModel');
const express = require('express');
const router = express.Router();
const authController = require('../helpers/auth');

//** ALL business routes except signin siginup and logout will require auth.

//route all auth routes to the auth helper
router.route('/businesses/signin').post(authController.signin);
router.route('/businesses/signup').post(authController.signup);

//this route allows the business to logoff and destroy the session
router.route('/businesses/logout').get((req,res) => {
  req.session.destroy();
  res.redirect('/')
})

//this route will be served as soon as a business logs on it will retrieve all applications. 
router.route('/businesses/dashboard').get(authController.auth, (req,res) => {
  Application.find({businessId: req.session.businessId}, (err,data) => {
    if(err){
      console.log(err);
      res.status(404)
    } else if ( data.length === 0){
      res.status(204).send(data)
    } else {
      res.status(200).send(data);
    }
  })
});

router.route('/businesses/template').get(authController.auth, (req, res) => {
  CustomApp.find({businessId: req.session.businessId})
    .then((template) => {
      res.status(201).send(template);
    })
})
//this route will allow the business to create or update thier custom application specifications. 
router.route('/businesses/updateApplication').put(authController.auth, (req,res) => {
  const updatedCustomApp = req.body;
  updatedCustomApp.businessId = req.session.businessId;
  CustomApp.remove({ businessId: updatedCustomApp.businessId })
    .then(() => {
      const newCustomApp = new CustomApp(updatedCustomApp);
      newCustomApp.save()
        .then((data) => {
          res.status(201).send(data);
        })
    })
})

//this route is used for testing purposes to see if a session cookie has been created and is still active
router.route('/businesses/test').get(authController.auth, (req,res) => {
  res.send('got it!')
});
//TODO create logout route.

router.route('/businesses/usernameChecker').put((req,res) => {
  const user = req.body.username ? req.body.username.toLowerCase() : '';
  //username customUrl email
  Business.findOne({username: user})
    .then((data, err) => {
      if(err){
        console.log(err);
      } else if (!data) {
        res.status(200).send(false)
      } else {
        res.status(200).send(true)
      }
    })
})
router.route('/businesses/customUrlChecker').put((req,res) => {
  const url = req.body.customUrl ? req.body.customUrl.toLowerCase() : '';
  //username customUrl email
  Business.findOne({customUrl: url})
    .then((data, err) => {
      if(err){
        console.log(err);
      } else if (!data) {
        res.status(200).send(false)
      } else {
        res.status(200).send(true)
      }
    })
})

module.exports = router;