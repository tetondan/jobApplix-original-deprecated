'use strict'

const mongoose = require('mongoose');

var customAppSchema = mongoose.Schema({
  businessId: [{type: mongoose.Schema.Types.ObjectId, ref: 'Business'}],
  basicInfo: Boolean,
  position: Boolean,
  availability: Boolean,
  customShiftTimes: Boolean,
  shift1: Object,
  shift2: Object,
  shift3selected: Boolean,
  shift3: Object,
  fired: Boolean,
  crimes: Boolean,
  crimesExplanation: Boolean,
  backgroundCheck: Boolean,
  fullOrPartime: Boolean,
  drugTest: Boolean,
  workReferences: Boolean,
  personalReferences: Boolean,
  education: Boolean,
  physicalLimitation: Boolean,
  authWorkInUS: Boolean,
  validDriversLicense: Boolean,
  overFourteen: Boolean,
  overSixteen: Boolean,
  overEighteen: Boolean,
  overTwentyone: Boolean,
  overtime: Boolean,
  permanent: Boolean,
  otherLanguages: Boolean,
  adequateTrans: Boolean,
  specializedSkills: Boolean,
  computerRepair: Boolean,
  softwareExperience: Boolean,
  proffesionalCerts: Boolean,
  typingSpeed: Boolean,
  veteran: Boolean,
  dateAvailableToBeginWork: Boolean,
  otherComments: Boolean,
  custom1: String,
  custom2: String,
  positionDescription: String,
  firstTime: Boolean
})
var Custom = mongoose.model('Custom', customAppSchema);

module.exports = Custom;