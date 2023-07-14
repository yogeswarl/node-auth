const express = require("express");
const router = express.Router();
const { sendEmailVerification, verifyEmail } = require("./controller");

router.post("/verify", async (req, res) => {
	try {
		let { email, otp } = req.body;
		if (!(email && otp)) {
			throw new Error("Email and OTP are required");
		}
		await verifyEmail({ email, otp });
		res.status(200).json({ email, message: "Email verified successfully" });
	} catch (error) {
		throw new Error(error);
	}
});
router.post("/", async (req, res) => {
	try {
		const { email } = req.body;
		if (!email) {
			throw new Error("Email is required");
		}
		const otp = await sendEmailVerification(email);
		res.status(200).json({ otp });
	} catch (error) {
		throw new Error(error);
	}
});

module.exports = router;
