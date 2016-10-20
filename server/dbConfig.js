'use strict'

var mongoose = require('mongoose');

const mongoURI = process.env.CUSTOMCONNSTR_MONGOLAB_URI_JOBAPPLIX || 'mongodb://localhost/jobApplix' ;

mongoose.connect(mongoURI);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

module.exports = db;

