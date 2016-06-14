'use strict'

const mongoose = require('mongoose');

var businessSchema = mongoose.Schema({
  /*username will be the name businesses give to applicants eg. if name is "target",
   address for application will be "http://www.jobapplix.com/apply/target" */
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  //name will be the actual name of the business, how they would like it to appear on the website
  name: { type: String, required: true },
  address: {type: String},
  phone: {type: String, required: true},
  website: {type: String},
  email: {type: String, required: true},
  questions: []
}, {collection: 'business'});


var Business = mongoose.model('Business', businessSchema);

module.exports = Business;


// {
//   "username": "JobApplix",
//   "password": "test1",
//   "name": "Daniel Frehner",
//   "address": "123 Fake st.",
//   "phone": "9099478131",
//   "website": "http://www.jobApplix.com",
//   "email": "jobApplix@gmail.com"
// }