const mongoose = require('mongoose');
const SCHEMA = mongoose.Schema;

// create a user schema
const userSchema = new SCHEMA({
  name: String,
  email: {type:String, unique:true},
  password: String,
  role: String,
  token: String,
});

// create a user model
const User = mongoose.model('User', userSchema);

// export the user model
module.exports = User;
