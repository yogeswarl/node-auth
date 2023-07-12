const express = require("express");
const { createNewUser } = require("./controller");
const router = express.Router();

router.post("/signup", async (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	try {
		let { name, email, password, role } = req.body;
		name = name.trim();
		email = email.trim();
		password = password.trim();
		role = role.trim();
		if (!(name && email && password && role)) {
      throw new Error("All input is required");
		} else if (!/^[a-zA-Z]*$/.test(name)) {
      throw new Error("Invalid characters in name");
    } else if(!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email)) {
      throw new Error("Invalid email");
    } else if (password.length < 8) {
      throw new Error("Password must be at least 8 characters");
    } else {
      const newUser = await createNewUser({ name, email, password, role });
			res.status(200).json({newUser})
    }
	} catch (error) {
		res.status(400).send(error.message);
	}
});

module.exports = router;