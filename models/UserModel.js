const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
  },
  gender: {
    type: String,
  },
  mobile: {
    type: Number,
  },
  password: {
    type: String,
    trim: true,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
