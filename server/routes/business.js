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
  console.log(req.session.businessId)
  Application.find({businessId: req.session.businessId}, (err,data) => {
    if(err){
      console.log(err);
      res.status(404)
    } else if ( data.length === 0){
      res.status(200).send({message: 'No applications'})
    } else {
      res.status(200).send(data);
    }
  })
});


//this route will allow the business to create or update thier custom application specifications. 
router.route('/businesses/updateApplication').put(authController.auth, (req,res) => {
  var updatedCustomApp = req.body;
  updatedCustomApp.businessId = req.session.businessId;
  CustomApp.where({ businessId: updatedCustomApp.businessId })
          .then((oldApp) => {
            oldApp = oldApp[0]
             if(oldApp === undefined){
              var custom = new CustomApp(updatedCustomApp)
              custom.save((err, data) => {
                if(err){
                  console.log(err)
                  res.status(500)
                } else {
                  res.send(200)
                }
              })
            } else {
              console.log('already created', oldApp)
              for (var field in CustomApp.schema.paths) {
                if ((field !== '_id') && (field !== '__v')) {
                  if (updatedCustomApp[field] !== undefined) {
                    oldApp[field] = updatedCustomApp[field];
                  }
                }
              }
              oldApp.save((err,data) => {
                if(err){
                  console.log(err);
                  res.status(500)
                } else {
                  res.status(200).send('updated');
                }
              })  
            }
          })
})

//this route is used for testing purposes to see if a session cookie has been created and is still active
router.route('/businesses/test').get(authController.auth, (req,res) => {
  res.send('got it!')
});
//TODO create logout route.

module.exports = router;