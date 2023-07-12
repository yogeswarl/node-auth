const express = require("express");
const { createNewUser,authenticateUser } = require("./controller");
const router = express.Router();

// @route GET api/users/login
router.post('/login', async (req, res) => {
	try {
		let { email, password } = req.body;
		email = email.trim();
		password = password.trim();

		if (!(email && password)) {
			throw new Error("All input is required");
		} else {
			const authenticatedUser = await authenticateUser({email,password});
			res.status(200).json({authenticatedUser});
		}
	}
	catch (error) {
		res.status(400).send(error.message);
	}
});

// @route POST api/users/signup
router.post("/signup", async (req, res) => {
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