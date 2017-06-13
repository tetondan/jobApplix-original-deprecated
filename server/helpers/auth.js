'use strict'

const Business = require('../dbModels/businessModel')
const bcrypt = require('bcrypt-nodejs')

const signin = ( req, res ) => {
  var info = req.body;
  Business.findOne({ username: info.username.toLowerCase() }, ( err, results ) => {
    if( results === null ){
      res.status(401).send("Incorrect Username or Password")
    } else {
      logIn(info.password, results.password)
        .then( ( isPass ) => {
          if(isPass === true){
            req.session.businessId = results._id
            results.password = undefined
            results._id = undefined
            results.__v = undefined
            res.status(200).send(results)
          } else {
            res.status(401).send("Incorrect Username or Password")
          }
        })
        .catch( ( err ) => {
          res.status(500).send("Incorrect Username or Password")
        })
    }
  })
};

const updatePassword = (req, res) => {
  const username = req.body.username ? req.body.username.toLowerCase() : ''
  const newPW = req.body.updatedPassword ? req.body.updatedPassword : ''
  const pass = req.body.pass ? req.body.pass : ''
  if(pass === process.env.ADMIN_PASS){
    setPass(newPW)
      .then((result) => {
        Business.update({username: username},{$set: {password: result}}, (err, data, raw) => {
          if(err){
            console.log(err)
          } else {
            res.status(200).send(data)
          }
        })
      })
  } else {
    res.status(401).send('Not Authorized')
  }
}

const signup = ( req, res ) => {
  var businessObj = req.body
  //check if username supplied
  if(!businessObj.username || !businessObj.password) { 
    res.status(404).send("Username and password required");
    return
  }

  Business.findOne({ username: businessObj.username.toLowerCase() }, ( err, results ) => {
    if( results !== null ){
      res.status(401).send("Business name already taken")
    } else {
      setPass(businessObj.password)
        .then( ( passHash ) => {
          businessObj.password = passHash;
          businessObj.username = businessObj.username.toLowerCase();
          businessObj.customUrl = businessObj.customUrl.toLowerCase()
          var business = new Business(businessObj);
          business.save((err, data) => {
            if(err){
              console.log(err)
              res.status(500)
            } else {
              req.session.businessId = data._id
              res.status(201).send(data);
            }
          })
        })
        .catch( ( err ) => {
          res.status(500).send(err)
        })      
    }
  })
};

const setPass = ( passString ) => {
  return new Promise( ( resolve, reject ) => {
    bcrypt.genSalt(10, ( err, salt ) => {    
      bcrypt.hash(passString, salt, null, ( err, passHash ) => {
        if( !err ) {
          resolve(passHash);
        } else {
          reject(err);
        }
      })
    })
  })
}

const logIn = ( passString, encryptedPass ) => {
  return new Promise( ( resolve, reject ) => {
    bcrypt.compare(passString, encryptedPass, ( err, res ) => {
      if( !err ){
        resolve(res)
      } else {
        reject(err)
      }
    })
  })
}

const auth = ( req, res, next ) => {
  if ( req.session.businessId )
    return next();
  else
    return res.sendStatus(401);
};


module.exports = { signup, signin, auth, updatePassword };