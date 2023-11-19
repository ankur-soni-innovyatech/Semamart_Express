const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/verify-otp-register', userController.verifyOtpRegister);
router.post('/login', userController.login);
router.post('/verify-otp-login', userController.verifyOtpLogin);

module.exports = router;