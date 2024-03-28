const express = require('express');
const router = express.Router();
const contactForm  = require('../controllers/contactController');

router.route('/contactme').post(contactForm.createContact);

router.route('/delete/:id').delete(contactForm.deleteContact);

module.exports = router;
