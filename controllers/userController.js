const User = require('../models/user');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
var transporter = require('../mailSender');

// let transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'ankursoni2974@gmail.com',
//     pass: 'tgpoldqrmznkerai'
//   }
// });

const otps = {};

exports.register = async (req, res) => {
  // Your existing registration code here...
  try{
    const {name, email} = req.body;

    // Check if user is already registered
    const userExists = await User.findOne({email});
    if (userExists) {
      return res.status(400).json({message: 'User already registered'});
    }
    // Generate OTP
    const otp = crypto.randomBytes(4).toString('hex');
    const otpExpire = Date.now() + 300000; // OTP valid for 5 minutes
  
    // Store OTP in temporary storage
    otps[email] = {otp, otpExpire, name};
    console.log('Hi');
  
    // Send OTP to user's email
    let info = await transporter.sendMail({
      from: '"Ankur" <${process.env.SENDER_EMAIL}>', // sender address
      to: email, // list of receivers
      subject: "OTP for Registration for Semamart", // Subject line
      text: `Your OTP is ${otp}`, // plain text body
    });
  
    res.json({message: 'OTP sent to email'});
  }
  catch (err) {
    res.status(500).send(err);
  }
};
  
  exports.verifyOtpRegister = async (req, res) => {
    // Your existing verify-otp-register code here...
    try{
      const {email, otp} = req.body;
  
      // Check if OTP exists
      if (!otps[email]) {
        return res.status(400).json({message: 'OTP not found'});
      }
    
      const {otp: storedOtp, otpExpire, name} = otps[email];
    
      // Check OTP
      if (otp !== storedOtp) {
        return res.status(400).json({message: 'Invalid OTP'});
      }
    
      // Check if OTP has expired
      if (Date.now() > otpExpire) {
        return res.status(400).json({message: 'OTP has expired'});
      }
    
      // If everything is okay, register user
      const user = new User({name, email});
      await user.save();
    
      // Remove OTP from temporary storage
      delete otps[email];
    
      res.json({message: 'User registered successfully'});
    }
    catch(err){
      res.status(500).send(err);
    }
  };


exports.login = async (req, res) => {
  // Your existing login code here...
  try{
    const {email} = req.body; // Removed 'name'
    console.log("EMAIL: " + email);
    // Find user
    const user = await User.findOne({email});
  
    if (!user) {
      return res.status(400).json({message: 'User not found'});
    }
  
    // Generate new OTP
    const otp = crypto.randomBytes(4).toString('hex');
    const otpExpire = Date.now() + 300000; // OTP valid for 5 minutes
  
    // Store OTP in temporary storage
    otps[email] = {otp, otpExpire};
  
    // Send OTP to user's email
    let info = await transporter.sendMail({
      from: '"Ankur" <${process.env.SENDER_EMAIL}>', // sender address
      to: email, // list of receivers
      subject: "OTP for login in Semamart", // Subject line
      text: `Your OTP is ${otp}`, // plain text body
    });
    
    res.json({message: 'OTP sent to email'});
  }
  catch(err){
    res.status(500).send(err);
  }
};

exports.verifyOtpLogin = async (req, res) => {
  // Your existing verify-otp-register code here...
  try{
    const {email, otp} = req.body;

    // Find user
    const user = await User.findOne({email});

    // Check if OTP exists
    if (!otps[email]) {
      return res.status(400).json({message: 'OTP not found'});
    }
  
    const {otp: storedOtp, otpExpire} = otps[email];
  
    // Check OTP
    if (otp !== storedOtp) {
      return res.status(400).json({message: 'Invalid OTP'});
    }
  
    // Check if OTP has expired
    if (Date.now() > otpExpire) {
      return res.status(400).json({message: 'OTP has expired'});
    }
  
    // If everything is okay, user is logged in
    // Remove OTP from temporary storage
    delete otps[email];

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      /* isAdmin: user.isAdmin,
      phoneNumber:user.phoneNumber,
      token: generateToken(user._id), */
      message: 'User logged in successfully'
  })
  }
  catch(err){
    res.status(500).send(err);
  }
  };