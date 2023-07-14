const express = require('express');
const router = express.Router();

const userRouter = require('../domains/user');
const otpRouter = require('../domains/otp');
const emailRouter = require('../domains/email_verification');
router.use('/user', userRouter);
router.use('/otp', otpRouter);
router.use('/email', emailRouter);

module.exports = router;