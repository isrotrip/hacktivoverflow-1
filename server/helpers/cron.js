const User = require('../models/user');
const cron = require('node-cron');
const kue = require('kue');
const queue = kue.createQueue();
const sendEmail = require('./nodemailer');

module.exports = () => {
  kue.app.listen(3005);

  const everyMonths = '0 0 30 * *';

  cron.schedule(everyMonths, () => {
    User.find()
      .then((users) => {
        users.forEach(user => {
          queue.create('send-notif-email', {
            title: 'Welcome to our application',
            user: user
          }).save()
        })
      })
      .catch(error => {
        console.log(error)
      })
  });
  
  
  queue.process('send-notif-email', (job, done) => {
    setTimeout(() => {
      sendEmail(job.data.user)
      done()
    }, 1000);
  })
}