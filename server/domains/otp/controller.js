const OTP = require("./model.js");
const generateOTP = require("../../util/generateOTP.js");
const sendEmail = require("../../util/sendEmail.js");
const { hashData,compareHashedData } = require("../../util/hashing.js");
const { AUTH_EMAIL } = process.env;

const verifyOTP = async ({ email, otp }) => {
  try{
    if (!(email && otp)) {
			throw new Error("provide values for email and otp");
		}
    const otpRecord = await OTP.findOne({email});
    if (!otpRecord){
      throw new Error("OTP record not found");
    }
    const {createdAt} = otpRecord;
    //checking expired otp code
    if (Date.now() > createdAt) {
      await OTP.deleteOne({email});
      throw new Error("OTP expired");
    }
    const hashedOTP = otpRecord.otp;
    const isMatch = await compareHashedData(otp,hashedOTP);
    return isMatch;
  }
  catch (error){
    throw new Error(error)
  }
}
const sendOTP = async ({ email, subject, message, duration = 1 }) => {
	try {
		if (!(email && subject && message)) {
			throw new Error("All input is required");
		}
		//delete previous otp messages sent
		await OTP.deleteOne({ email });
		const generatedOTP = await generateOTP();
		const mailOptions = {
			FROM: AUTH_EMAIL,
			to: email,
			subject,
			html: `<html><p>${message}</p><p style="color: red;">${generatedOTP}</p><p>OTP expires in ${duration} minutes</p></html>`,
		};
		await sendEmail(mailOptions);
		//save otp to db
		const hashedOTP = await hashData(generatedOTP);
		const creataOTP = await OTP.create({
			email,
			otp: hashedOTP,
			createdAt: Date.now() + duration * 60000,
		});
		const createOTPRecord = await creataOTP.save();
		return createOTPRecord;
	} catch (error) {
		throw new Error(error);
	}
};

const deleteOTP = async ({ email }) => {
  try {
    if (!email) {
      throw new Error("provide email");
    }
    const otpRecord = await OTP.findOne({ email });
    if (!otpRecord) {
      throw new Error("OTP record not found");
    }
    await OTP.deleteOne({ email });
    return "OTP record deleted";
  } catch (error) {
    throw new Error(error);
  } 
};


module.exports = {sendOTP,verifyOTP, deleteOTP};
