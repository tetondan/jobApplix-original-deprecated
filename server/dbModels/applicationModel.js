const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: {type: String},
  email: {type: String},
  city: {type: String},
  availability: [{type: Array}],
  fired: {type: Boolean},
  firedExplanation: {type: String},
  crimes: {type: Boolean},
  crimesExplanation: {type: String},
  References: [{type: Array}],
  physicalLimitation: {type: Boolean},
  authWorkInUS: {type: Boolean},
  overEighteen: {type: Boolean},
  overTwentyone: {type: Boolean},
  otherLanguages: {type: Boolean},
  whichLanguages: {type: String},
  adequateTrans: {type: Boolean},
  specializedSkills: {type: String},
  otherComments: {type: String},
  zip: {type: Number},
  businessId: {type: String}
}, {collection: 'application'});


const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;

/*
THINGS TO ADD:

Prior work history?

Education

*/