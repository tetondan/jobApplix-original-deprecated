'use strict'

const express = require('express');
const aws = require('aws-sdk');
const stripe = require('stripe')("sk_test_BQokikJOvBiI2HlWgH4olfQ2");
const S3_BUCKET = 'jobapplix';

const CustomApp = require('../dbModels/customApplication');
const Application = require('../dbModels/applicationModel');
const Business = require('../dbModels/businessModel');

const authController = require('../helpers/auth');

const router = express.Router();

router.route('/sign-s3').get(authController.auth, (req, res) => {
  const s3 = new aws.S3();
  const fileExtension = req.query['file-name'].split('.')
  const fileName = req.session.businessId + '.' + fileExtension[fileExtension.length - 1];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 15,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, ( err, data ) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    Business.update({ _id: req.session.businessId }, { iconURL: returnData.url }, ( err, data ) => { 
      if(err){
        console.log(err);
      }else{
        res.write(JSON.stringify(returnData));
        res.end();
      }
    })
  });
});

//route all auth routes to the auth helper
router.route('/signin').post(authController.signin);
router.route('/signup').post(authController.signup);

//this route allows the business to logoff and destroy the session
router.route('/logout').get( ( req, res ) => {
  req.session.destroy();
  res.redirect('/')
});

//this route will be served as soon as a business logs on it will retrieve all applications. 
router.route('/dashboard').get(authController.auth, ( req, res ) => {
  Application.find({businessId: req.session.businessId}, ( err, data ) => {
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

router.route('/info').get(authController.auth, ( req, res ) => {
  Business.find({ _id: req.session.businessId })
    .then( ( data ) => {
        var businessData = data[0];
        businessData.password = undefined;
        businessData._id = undefined;
        businessData.__v = undefined;
        res.status(201).send(data[0]);
    });
});

router.route('/template').get( authController.auth, ( req, res ) => {
  CustomApp.find({ businessId: req.session.businessId })
    .then( ( template ) => {
      res.status(201).send(template);
    });
});

//this route will allow the business to create or update thier custom application specifications. 
router.route('/updateApplication').put(authController.auth, ( req, res ) => {
  const updatedCustomApp = req.body;
  updatedCustomApp.businessId = req.session.businessId;
  CustomApp.remove({ businessId: updatedCustomApp.businessId })
    .then( () => {
      const newCustomApp = new CustomApp(updatedCustomApp);
      newCustomApp.save()
        .then( ( data ) => {
          res.status(201).send(data);
        });
    });
});

router.route('/updateProfile').put( authController.auth, ( req, res ) => {
  const updatedInfo = req.body;
  Business.update({ _id: req.session.businessId },{ $set: req.body })
    .then( ( data, err ) => {
      if(err){
        console.log(err);
        res.status(500).send('Error')
      } else {
        res.status(201).send(data);
      }
    });
});

router.route('/usernameChecker').put( ( req, res ) => {
  const user = req.body.username ? req.body.username.toLowerCase() : '';
  const businessId = req.session ? req.session.businessId : null;
  //username customUrl email
  if(businessId){
    Business.findOne({ _id: businessId })
      .then( ( data, err ) => {
        if(user === data.username){
          res.status(200).send(false);
          return
        }
      });
  }
  Business.findOne({ username: user })
    .then( ( data, err ) => {
      if(err){
        console.log(err);
      } else if (!data) {
        res.status(200).send(false)
      } else {
        res.status(200).send(true)
      }
    });
});

router.route('/customUrlChecker').put( ( req, res ) => {
  const url = req.body.customUrl ? req.body.customUrl.toLowerCase() : '';
  const businessId = req.session ? req.session.businessId : null;
  //username customUrl email
  if(businessId){
    Business.findOne({ _id: businessId })
      .then( ( data, err ) => {
        if(url === data.customUrl){
          res.status(200).send(false);
          return
        }
      });
  }
  Business.findOne({ customUrl: url })
    .then( ( data, err ) => {
      if(err){
        console.log(err);
      } else if (!data) {
        res.status(200).send(false)
      } else {
        res.status(200).send(true)
      }
    })
});

//retreives the business info from the database
router.route('/:customUrl').get( ( req, res ) => {
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

router.route('/payment').post( async ( req, res ) => {
  const { token, amt, len, id } = req.body;
  try {
    const customer = await stripe.customers.create({
      source: token
    })
    const charge = await stripe.charges.create({
      customer: customer.id,
      amount: amt,
      currency: 'usd'
    })

    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    let expDate = len === 'year' 
      ? new Date( year + 1, month, day ) 
      : new Date( year, month + 1, day )

    const businessDetails = {
      stripeCustomerId: customer.id,
      expired: false,
      expires: expDate,
      subType: len
    }
    const updatedBusiness = await Business.findByIdAndUpdate(id, businessDetails, {new: true})
    if(updatedBusiness !== null){
      res.sendStatus(204)
    } else {
      throw new Error('no business')
    }
  } catch(err){
    res.sendStatus(500)
    return
  }

})
router.route('/admin/changepws').put(authController.updatePassword) 

module.exports = router;