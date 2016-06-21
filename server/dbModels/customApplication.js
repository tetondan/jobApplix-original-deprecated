'use strict'

const mongoose = require('mongoose');

var customAppSchema = mongoose.Schema({
  businessId: [{type: mongoose.Schema.Types.ObjectId, ref: 'Business'}],
  firstName: {type: Boolean},
  lastName: {type: Boolean},
  phone: {type: Boolean},
  email: {type: Boolean},
  city: {type: Boolean},
  availability: {type: Boolean},
  fired: {type: Boolean},
  firedExplanation: {type: Boolean},
  crimes: {type: Boolean},
  crimesExplanation: {type: Boolean},
  drugTest: {type: Boolean},
  workReferences: {type: Boolean},
  personalReferences: {type: Boolean},
  education: {type: Boolean},
  physicalLimitation: {type: Boolean},
  authWorkInUS: {type: Boolean},
  validDriversLicense: {type: Boolean},
  overFourteen: {type: Boolean},
  overSixteen: {type: Boolean},
  overEighteen: {type: Boolean},
  overTwentyone: {type: Boolean},
  overtime: {type: Boolean},
  permanent: {type: Boolean},
  otherLanguages: {type: Boolean},
  whichLanguages: {type: Boolean},
  adequateTrans: {type: Boolean},
  specializedSkills: {type: Boolean},
  computerRepair: {type: Boolean},
  proffesionalCerts: {type: Boolean},
  typingSpeed: {type: Boolean},
  veteran: {type: Boolean},
  dateAvailableToBeginWork: {type: Boolean},
  otherComments: {type: Boolean},
  zip: {type: Boolean}
})
var Custom = mongoose.model('Custom', customAppSchema);

module.exports = Custom;