'use strict'

const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: {type: String, required: true },
  email: {type: String},
  city: {type: String},
  availability: {
    mondayFirst: {type: Boolean},
    mondaySecond: {type: Boolean},
    mondayThird: {type: Boolean},
    tuesdayFirst: {type: Boolean},
    tuesdaySecond: {type: Boolean},
    tuesdayThird: {type: Boolean},
    wednesdayFirst: {type: Boolean},
    wednesdaySecond: {type: Boolean},
    wednesdayThird: {type: Boolean},
    thursdayFirst: {type: Boolean},
    thursdaySecond: {type: Boolean},
    thursdayThird: {type: Boolean},
    fridayFirst: {type: Boolean},
    fridaySecond: {type: Boolean},
    fridayThird: {type: Boolean},
    saturdayFirst: {type: Boolean},
    saturdaySecond: {type: Boolean},
    saturdayThird: {type: Boolean},
    sundayFirst: {type: Boolean},
    sundaySecond: {type: Boolean},
    sundayThird:{type: Boolean}
  },
  fired: {type: Boolean},
  firedExplanation: {type: String},
  crimes: {type: Boolean},
  crimesExplanation: {type: String},
  references: [],
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
  state: {type: Number},
  businessId: {type: String}
}, {collection: 'application'});


const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;

/*
THINGS TO ADD:

Prior work history?

Education

*/