const HashData = require("../../util/hashing.js");
const User = require("./model");
const createNewUser = async (data) => {
	try {
		let { name, email, password, role } = data;
    password = password.toString()
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			throw new Error("User already exists");
		}
		const hashedPassword = await HashData(password);
		const newUser = new User({
			name,
			email,
			password: hashedPassword,
			role,
		});
		const savedUser = await newUser.save();
		return savedUser;
	} catch (error) {
		throw new Error( error);
	}
};

module.exports = {createNewUser};
