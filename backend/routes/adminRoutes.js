const express = require('express');
const { adminController, generateToken } = require('../controllers/adminController');
const { authenticateToken } = require('../middleware/authAdminMiddleware');
const router = express.Router();


router.route('/create-admin').post(adminController.createAdmin)
router.route('/login-admin').post(adminController.loginAdmin);
router.route('/get-admin/:adminId').get(adminController.getAdmin);
router.route('/getme').get(authenticateToken, adminController.getMe);

// Update admin
router.route('/:adminId').put(adminController.updateAdmin);

//delete admin
router.route('/:adminId').delete(adminController.deleteAdmin);
module.exports = router; 