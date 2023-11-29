const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD
    }
  });

module.exports = transporter;