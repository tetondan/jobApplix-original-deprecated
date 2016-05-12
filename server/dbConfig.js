var mongoose = require('mongoose');
//MongoDb address variable, an adress is supplied it will use that adress otherwise it will use the adress provided here. 
mongoURI = process.env.CUSTOMCONNSTR_MONGOLAB_URI_TEST || 'mongodb://localhost/jobApplix';
//connect MongoDb to Db residing at address variable
mongoose.connect(mongoURI);
// Run in seperate terminal window using 'mongod'
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//  // console.log('Mongodb connection open');
//  // console.log(mongoURI);
// });

module.exports = db;