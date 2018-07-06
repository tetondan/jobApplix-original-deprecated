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

module.exports = router;