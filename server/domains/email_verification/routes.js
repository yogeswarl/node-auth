const express = require('express');
const router = express.Router();
const {sendEmailVerification} = require('./controller');

router.post('/', async (req,res) => {
  try {
    const {email} = req.body;
    if(!email){
      throw new Error("Email is required")
    }
    const otp = await sendEmailVerification(email);
    res.status(200).json({otp})
  } catch (error) {
    throw new Error(error)
  }
})


module.exports = router;
