'use strict'

const CustomApp = require('../dbModels/customApplication')
const Application = require('../dbModels/applicationModel');
const Business = require('../dbModels/businessModel')
const express = require('express');
const router = express.Router();


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
  Business.find({customUrl: req.params.businessName}, (err, data) => {
    if(err) {
      console.log(err)
      res.sendStatus(404)
    } else {
      let businessData = data[0];
      CustomApp.findOne({businessId: businessData._id})
               .populate('businessId')
               .exec((err, app) => {
                  if(err){
                    console.log(err)
                    res.status(500)
                  } else {
                    app.businessId[0].password = undefined;
                    app.businessId[0].__v = undefined;
                    app.businessId[0].username = undefined;
                    app.businessId[0]._id = undefined;
                    res.status(200).send(app)
                  }
               })
    }
  })
});

module.exports = router;