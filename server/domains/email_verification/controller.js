const User = require("../user/model");
const { sendOTP } = require("../otp/controller");
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

module.exports = { sendEmailVerification };
