const asyncHandler = require('express-async-handler');
const nodemailer = require('nodemailer');
const ContactForm = require('../models/contactSchema');

const contactForm = asyncHandler(async(req, res) => {
    const {name, email, message } = req.body;

    if(!name || !email || !message) {
        res.status(400);
        throw new Error('All fields are required!');
    };

    const newForm = await ContactForm.create({
        name, email, message
    });

    if(newForm) {
        // Email sending logic
        // Create a Nodemailer transporter
        const transporter = nodemailer.createTransport({
             host: "mail.celestialcrafters.co.ke",
    port: 465,
    auth: {
      user: "softwaredevelopers@celestialcrafters.co.ke",
      pass: "Crafters@123",
    },
        });

        // Email message options
        const mailOptions = {
            from: email, // Sender address (user's email)
            to: 'softwaredevelopers@celestialcrafters.co.ke', // Receiver address (your email)
            subject: 'New Form Submission',
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        };

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                // Handle error response if email sending fails
                res.status(500).send('Error sending email');
            } else {
                console.log('Email sent:', info.response);
                // Send success response after email sent successfully
                res.status(200).send('Email sent successfully');
            }
        });
    } else {
        res.status(400);
        throw new Error('Invalid data');
    }
});

module.exports = contactForm;
