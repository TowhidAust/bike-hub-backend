const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const signupModel = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Signup = mongoose.model("Users", signupModel);

module.exports = Signup;
