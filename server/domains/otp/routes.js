const express = require("express");
const router = express.Router();
const sendOTP  = require("./controller.js");

router.post("/", async (req, res) => {
	try {
		const { email, subject, message, duration } = req.body;
    const createOTPRecord = await sendOTP({ email, subject, message, duration });    
    res.status(200).json({createOTPRecord});
	} catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
