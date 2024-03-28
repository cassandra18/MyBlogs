const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const ContactForm = require("../models/contactSchema");

const contactForm = {
  createContact: asyncHandler(async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      res.status(400);
      throw new Error("All fields are required!");
    }
try{
    const newForm = await ContactForm.create({
      name,
      email,
      message,
    });

    if (newForm) {
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
        from: "softwaredevelopers@celestialcrafters.co.ke", // Sender address (user's email)
        to: "cassandralelei12@gmail.com", // Receiver address (your email)
        subject: "New Form Submission",
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      };

      // Send email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          // Handle error response if email sending fails
          res.status(500).json({ message: "Error sending email" });
        } else {
          console.log("Email sent:", info.response);
          // Send success response after email sent successfully
          res.status(200).json({ message: "Email sent successfully" });
        }
      });
    }
} catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
        // Handle the situation where a duplicate key error occurs due to the email address
        res.status(400).json({ message: 'You have already submitted a form with this email address, Kindly continue with the chat through email' });
    } else {
        // Handle other errors
        res.status(500).json({ message: 'An unexpected error occurred' });
    }
}
  }),

  deleteContact: asyncHandler(async (req, res) => {
    try {
      const postId = req.params.id;
      const post = await ContactForm.findByIdAndDelete(postId);
      if (post) {
        return res
          .status(201)
          .json({ message: "Contact form deleted successfully" });
      } else {
        res.status(404)
        throw new Error('Form not found:', error);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }),
};

module.exports = contactForm;
