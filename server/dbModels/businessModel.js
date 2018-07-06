'use strict'

const mongoose = require('mongoose');

var businessSchema = mongoose.Schema({
  // username will be what the business uses to sign in with 
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  //name applicants will use to apply: http://www.jobapplix.com/apply/'customUrl'
  customUrl: { type: String, required: true, unique: true},
  //name will be the actual name of the business, how they would like it to appear on the website
  name: { type: String, required: true },
  address: {type: String},
  phone: {type: String},
  website: {type: String},
  email: {type: String, required: true},
  about: {type: String},
  iconURL: {type: String},
  subType: {type: Number},
  newBusiness: {type: Boolean},
  isBeta: {type: Boolean},
  stripeCustomerId: String,
  expires: Date,
  autopay: {type: Boolean, default: true},
  expired: {type: Boolean, default: true},
  subType: String
}, {collection: 'business'});

var Business = mongoose.model('Business', businessSchema);

module.exports = Business;