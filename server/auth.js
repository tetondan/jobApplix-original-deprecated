const Business = require('./dbModels/businessModel')
const bcrypt = require('bcrypt')

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

module.exports = {
  setPass: setPass,
  logIn: logIn
};