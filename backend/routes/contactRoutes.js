const express = require('express');
const router = express.Router();
const contactForm  = require('../controllers/contactController');

router.route('/contactme').post(contactForm);

module.exports = router;
