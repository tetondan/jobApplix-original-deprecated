'use strict'

const mongoose = require('mongoose');

var betaSchema = mongoose.Schema({
  appliedDate: {type: Date, default: Date.now },
  betaEmail: String
}, {collection: 'betaDetails'});


var BetaDetails = mongoose.model('BetaDetails', betaSchema);

module.exports = BetaDetails;