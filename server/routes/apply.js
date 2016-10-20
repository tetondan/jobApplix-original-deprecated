'use strict'

const CustomApp = require('../dbModels/customApplication');
const Application = require('../dbModels/applicationModel');
const Business = require('../dbModels/businessModel')
const express = require('express');
const router = express.Router();


//submit an application to a business
router.route('/applicationSubmit').post( ( req, res ) => {
  const appInfo = req.body;
  let application = new Application(appInfo)

  application.save( ( err ) => {
    if( err ){
      console.log(err)
      res.sendStatus(500)
    } else {
      res.status(201).send("Application submitted successfully");
    }
  });
});

router.route('/applicationUpdateGroup').put( ( req, res ) => {
  Application.findByIdAndUpdate(req.body.id, { $set: { applicationGroup: req.body.group }}, ( err, data ) => {
    if( err ){
      console.log(err);
      res.status(501);
    } else {
      res.status(202).send('updated');
    }
  })
});

router.route('/applicationUpdateComments').put( ( req, res ) => {
  Application.findByIdAndUpdate(req.body.id, { $set: { businessComments: req.body.businessComments }}, ( err, data ) => {
    if( err ){
      console.log(err);
      res.status(501);
    } else {
      res.status(202).send('updated');
    }
  })
});

//retreives the business info from the database
router.route('/businesses/:customUrl').get( ( req, res ) => {
  Business.find({ customUrl: req.params.customUrl.toLowerCase() }, ( err, data ) => {
    if( err ) {
      console.log(err)
      res.sendStatus(500)
    } else if( data.length === 0 ){
      res.sendStatus(404);
    } else {
      let businessData = data[0];
      CustomApp.findOne({ businessId: businessData._id })
               .populate('businessId')
               .exec( ( err, app ) => {
                  if(err){
                    console.log(err)
                    res.status(500)
                  } else if(app === null){
                    res.status(404);
                  } else {
                    app.businessId[0].password = undefined;
                    app.businessId[0].__v = undefined;
                    app.businessId[0].username = undefined;
                    res.status(200).send(app)
                  }
               })
    }
  })
});

module.exports = router;