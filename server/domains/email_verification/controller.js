const User = require("../user/model");
const { sendOTP,verifyOTP, deleteOTP} = require("../otp/controller");
const sendEmailVerification = async (email) => {
	try {
		const existingUser = await User.findOne({ email });
		if (!existingUser) {
			throw new Error("User does not exist");
		}
		const otpDetails = {
			email,
			subject: "Email Verification",
			message: "verify your email with the code below",
			duration: 10,
		};

    const otp = await sendOTP(otpDetails);
    return otp
	} catch (error) {
    throw new Error(error.message)
  }
};
const verifyEmail = async (email, otp) => {
  try {
    const validOTP = await verifyOTP({email,otp})
    if (!validOTP){
      throw new Error("Invalid OTP")
    }
    await deleteOTP({email})


  } catch (error) {
    throw new Error(error.message)
  }
};
module.exports = { sendEmailVerification,verifyEmail };
