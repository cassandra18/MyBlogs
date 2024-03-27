const nodemailer = require('nodemailer');
const asyncHandler = require("express-async-handler");


const sendEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  
  const transporter = nodemailer.createTransport({
    host: "mail.celestialcrafters.co.ke",
    port: 465,
    auth: {
      user: "softwaredevelopers@celestialcrafters.co.ke",
      pass: "Crafters@123",
    },
  });

  const mailOptions = {
    from: 'softwaredevelopers@celestialcrafters.co.ke',
    to: email,
    subject: 'New Newsletter Subscription',
    text: `
    Hello, \n\n
    Thank you for subscribing to our newsletter!\n
    Be sure to get hot,steamy blogs from our website.
    `
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error Sending email:', error);
        res.status(500).send('Error sending email')
    } else {
        console.log('Email sent:', info.response);
        res.status(200).send('Subscription Successful')
    }
  })
});

module.exports = { sendEmail };
