const express = require("express");
const router = express.Router();
const {sendOTP,verifyOTP} = require("./controller.js");

router.post("/verify",async (req,res)=>{
  try{
    let {email,otp} = req.body;
    const validateOTP = await verifyOTP({email,otp});
    res.status(200).json({validateOTP});  
  }catch(error){
    res.status(400).send(error.message);
  }
});
router.post("/", async (req, res) => {
	try {
		const { email, subject, message, duration } = req.body;
		const createOTPRecord = await sendOTP({
			email,
			subject,
			message,
			duration,
		});
		res.status(200).json({ createOTPRecord });
	} catch (error) {
		res.status(400).send(error.message);
	}
});

module.exports = router;
