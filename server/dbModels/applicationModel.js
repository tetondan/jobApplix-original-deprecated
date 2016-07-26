'use strict'

const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema({
  applicationGroup: Number,
  appliedDate: {type: Date, default: Date.now },
  firstName: String,
  lastName: String,
  middleName: String,
  phone: String,
  email: String,
  city: String,
  zip: String,
  position: String,
  backgroundCheck: Boolean,
  availability: {
    amMon: Boolean,
    pmMon: Boolean,
    amTues: Boolean,
    pmTues: Boolean,
    amWed: Boolean,
    pmWed: Boolean,
    amThurs: Boolean,
    pmThurs: Boolean,
    amFri: Boolean,
    pmFri: Boolean,
    amSat: Boolean,
    pmSat: Boolean,
    amSun: Boolean,
    pmSun: Boolean
  },
  fired: Boolean,
  firedExplanation: String,
  fullOrPartime: String,
  drugTest: Boolean,
  crimes: Boolean,
  crimesExplanation: String,
  workReferences: [],
  personalReferences: [],
  education: {
    highschool: {
      schoolName: String,
      location: String,
      yearsCompleted: String,
      fieldOfStudy: String,
      degree: String
    },
    college: {
      schoolName: String,
      location: String,
      yearsCompleted: String,
      fieldOfStudy: String,
      degree: String
    },
    tradeSchool: {
      schoolName: String,
      location: String,
      yearsCompleted: String,
      fieldOfStudy: String,
      degree: String
    }
  },
  physicalLimitation: Boolean,
  authWorkInUS: Boolean,
  validDriversLicense: Boolean,
  validDriversLicenseNumber: String,
  overFourteen: Boolean,
  overSixteen: Boolean,
  overEighteen: Boolean,
  overTwentyone: Boolean,
  overtime: Boolean,
  permanent: Boolean,
  otherLanguages: Boolean,
  whichLanguages: String,
  adequateTrans: Boolean,
  specializedSkills: Boolean,
  specializedSkillsList: String,
  computerRepair: Boolean,
  proffesionalCerts: String,
  typingSpeed: String, 
  veteran: Boolean,
  dateAvailableToBeginWork: String,
  otherComments: String,
  state: String,
  businessId: String
}, {collection: 'application'});


const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
