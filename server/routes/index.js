const express = require('express');
const router = express.Router();

const userRouter = require('../domains/user');
const otpRouter = require('../domains/otp');
router.use('/user', userRouter);
router.use('/otp', otpRouter);

module.exports = router;