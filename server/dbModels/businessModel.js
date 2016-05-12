const mongoose = require('mongoose');

var businessSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  address: {type: String},
  phone: {type: String},
  website: {type: String},
  email: {type: String},
  // salt: String
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