const express = require('express');
const router = express.Router();
const { sendEmail } = require('../controllers/emailController');

router.route('/subcribe').post(sendEmail);

module.exports = router;
