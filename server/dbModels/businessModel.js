const mongoose = require('mongoose');

var businessSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  address: {type: String},
  phone: {type: String},
  website: {type: String},
  email: {type: String}
  // salt: String
}, {collection: 'business'});


var Business = mongoose.model('Business', businessSchema);

module.exports = Business;