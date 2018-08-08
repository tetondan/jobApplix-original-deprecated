// const stripe = require('stripe')(process.env.STRIPE_KEY_TEST);
// const Business = require('./dbModels/businessModel');
// const CronJob = require('cron').CronJob;
// console.log('in the cron job file')
// new CronJob('0 * * * * *', async () => {
//   const today = new Date;
//   today.setHours(0,0,0,0);
//   const tomorrow = new Date;
//   tomorrow.setDate(today.getDate() + 1)
//   tomorrow.setHours(0,0,0,0);
// try{
//   const businesses = await Business.find({expires: {$gt: today, $lt: tomorrow}, autopay: true})
// } catch {
//   return
// }


// }, null, true, 'America/Los_Angeles')