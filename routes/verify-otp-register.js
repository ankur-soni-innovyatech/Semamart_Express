const express = require('express');
const router = express.Router();
const User = require('../models/user');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const { userController } = require('./controllers/userController');

router.post('/verify-otp-register', userController.verifyOtpRegister);

module.exports = router;
