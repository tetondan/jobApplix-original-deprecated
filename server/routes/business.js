'use strict'

var Application = require('../dbModels/applicationModel.js')
var Business = require('../dbModels/businessModel.js');
var express = require('express');
var router = express.Router();
var authController = require('../helpers/auth.js');

//** ALL business routes except signin siginup and logout will require auth.

//route all auth routes to the auth helper
router.route('/businesses/signin').post(authController.signin);
router.route('/businesses/signup').post(authController.signup);

//TODO create a route that allows the addition/updating of application questions.
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

router.route('/businesses/logout').get((req,res) => {
  req.session.destroy();
  res.redirect('/')
})

router.route('/businesses/updateApplication').put(authController.auth, (req,res) => {
  console.log('req.body', req.body)
  Business.where({ _id: req.session.businessId })
          .update({questions: req.body.questions})
          .then((data, err) => {
            if(err){
              console.log(err);
              res.status(400).send('nothing')
            } else {
              console.log(data)
              res.status(200).send('updated!')
            }
          })
})
router.route('/businesses/test').get(authController.auth, (req,res) => {
  res.send('got it!')
});
//TODO create logout route.

module.exports = router;