const {hashData, compareHashedData} = require("../../util/hashing.js");
const createToken = require("../../util/createToken.js");
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

const authenticateUser = async (data) => {
	try {
		const { email, password } = data;
		const user = await User.findOne({ email });
		if (!user) {
			throw new Error("no such user with email exists");
		}
		const isPasswordMatch = await hashData(password, user.password);
		if(!isPasswordMatch) {
			throw new Error("incorrect password");
		}
		const tokenData = { userId: user._id ,email};
		const token = await createToken(tokenData);

		user.token = token;
		return user;
	}
	catch (error) {
		throw new Error(error);
	}
};
module.exports = {createNewUser,authenticateUser};
