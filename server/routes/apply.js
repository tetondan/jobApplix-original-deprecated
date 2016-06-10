var Application = require('../dbModels/applicationModel.js');
var Business = require('../dbModels/businessModel.js')
var express = require('express');
var router = express.Router();


//submit an application to a business
router.route('/apply/:businessName').post((req, res) => {
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
//retreives the business info from the database
router.route('/businesses/:name').get((req, res) => {
  Business.find({name: req.params.name}, (err, data) => {
    if(err) {
      console.log(err)
      res.sendStatus(404)
    } else {
      //get and send all business data back to front end, especially application questions. 
      res.send(data[0]).sendStatus(200)
    }
  })
});

module.exports = router;