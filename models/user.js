const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  bloodGroup: {
    type: String,
    enum: [
      "A+",
      "A-",
      "B+",
      "B-",
      "C+",
      "C-",
      "O+",
      "O-",
      "AB+",
      "AB-",
      "notsure",
    ],
    required: true,
  },
  email: {
    type: String,
    minlength: 8,
    maxlength: 50,
    required: true,
  },
  phone: {
    type: String,
    minlength: 9,
    maxlength: 10,
    required: true,
  },
  address: {
    locality: {
      type: String,
      minlength: 3,
      maxlength: 50,
      required: false,
    },
    state: {
      type: String,
      minlength: 3,
      maxlength: 50,
      required: false,
    },
    zipcode: {
      type: Number,
      minlength: 3,
      maxlength: 10,
    },
    country: {
      type: String,
      minlength: 3,
      maxlength: 50,
      required: false,
    },
  },
  userType: {
    type: String,
    enum: ["donor", "seeker"],
    required: true,
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { id: this._id, role: this.role },
    process.env.PRIVATE_KEY
  );
  return token;
};

module.exports = mongoose.model("User", userSchema);
