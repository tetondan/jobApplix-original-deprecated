const Business = require('../dbModels/businessModel')
const bcrypt = require('bcrypt')

const signin = (req, res) => {
  var info = req.body;
  var sess = req.session;
  Business.findOne({username: info.username.toLowerCase()}, (err, results) => {
    if(results === null){
      res.status(404).send("Incorrect Username or Password 1")
    } else {
      logIn(info.password, results.password)
        .then((isPass) => {
          if(isPass === true){
            req.session.businessId = results._id
            results.password = undefined
            results._id = undefined
            results.__v = undefined
            results.username = undefined
            res.status(200).send(results)
          } else {
            res.status(404).send("Incorrect Username or Password 2")
          }
        })
        .catch((err) => {
          res.status(404).send("Incorrect Username or Password 3")
        })
    }
  })
};

const signup = (req, res) => {
  var businessObj = req.body
  Business.findOne({username: businessObj.username.toLowerCase()}, (err, results) => {
    if(results !== null){
      res.status(401).send("Business name already taken")
    } else {
      setPass(businessObj.password)
        .then((passHash) => {
          businessObj.password = passHash;
          businessObj.username = businessObj.username.toLowerCase();
          businessObj.customUrl = businessObj.customUrl.toLowerCase()
          var business = new Business(businessObj);
          business.save((err, data) => {
            if(err){
              console.log(err)
              res.status(400)
            } else {
              req.session.businessId = data._id
              res.status(201).send(data);
            }
          })
        })
        .catch((err) => {
          res.status(401).send(err)
        })      
    }
  })
};

const setPass = (passString) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {    
      bcrypt.hash(passString, salt, (err, passHash) => {
        if(!err) {
          resolve(passHash);
        } else {
          reject(err);
        }
      })
    })
  })
}

const logIn = (passString, encryptedPass) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(passString, encryptedPass, (err, res) => {
      if(!err){
        resolve(res)
      } else {
        reject(err)
      }
    })
  })
}

const auth = function(req, res, next) {
  if (req.session.businessId)
    return next();
  else
    return res.sendStatus(401);
};


module.exports = {
  signup: signup,
  signin: signin,
  auth: auth
};