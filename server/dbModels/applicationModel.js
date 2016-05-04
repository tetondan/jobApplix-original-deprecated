const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: {type: String},
  email: {type: String},
  zip: {type: Number},
  businessName: {type: String}
}, {collection: 'application'});


const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;