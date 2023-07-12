const OTP = require('./model.js');
const generateOTP  = require('../../util/generateOTP.js');
const sendEmail = require('../../util/sendEmail.js');
const {hashData}= require('../../util/hashing.js');
const {AUTH_EMAIL} = process.env;
const sendOTP = async ({email,subject, message,duration = 1}) => {
  try {
    if (!(email && subject && message)) {
      throw new Error("All input is required");
    }
    //delete previous otp messages sent
    await OTP.deleteOne({email});
    const generatedOTP = await generateOTP();
    const mailOptions ={FROM: AUTH_EMAIL, to: email, subject, html: `<p>${message}</p><br><p>${generatedOTP}</p><br><p>OTP expires in ${duration} minutes</p>`};
    await sendEmail(mailOptions);
    //save otp to db
    const hashedOTP = await hashData(generatedOTP);
    const creataOTP = await OTP.create({email, otp: hashedOTP,createdAt: Date.now() + duration * 60000});
    const createOTPRecord = await creataOTP.save();
    return createOTPRecord
    
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = sendOTP;