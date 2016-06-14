'use strict'

var Application = require('../dbModels/applicationModel.js');
var Business = require('../dbModels/businessModel.js')
var express = require('express');
var router = express.Router();


//submit an application to a business
router.route('/applicationsSubmit').post((req, res) => {
  var appInfo = req.body
  console.log()
  var application = new Application(appInfo)
  application.save((err) => {
    if(err){
      console.log(err)
      res.sendStatus(400)
    } else {
      res.status(201).send({message: "Application submitted successfully"});
    }
  })
})
//retreives the business info from the database
router.route('/businesses/:businessName').get((req, res) => {
  Business.find({username: req.params.businessName}, (err, data) => {
    if(err) {
      console.log(err)
      res.sendStatus(404)
    } else {
      let businessData = data[0];
      if(businessData){
        businessData.password = undefined;
        businessData.__v = undefined;
        businessData.username = undefined;
        //get and send all business data back to front end, especially application questions. 
        res.status(200).send(businessData)
      } else {
        res.status(404).send('no businesses by that name')
      }
    }
  })
});

module.exports = router;