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
      "a+",
      "a-",
      "b+",
      "b-",
      "c+",
      "c-",
      "o+",
      "o-",
      "ab+",
      "ab-",
      "notsure",
    ],
    required: true,
  },
  email: {
    type: String,
    minlength: 8,
    maxlength: 50,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    minlength: 10,
    maxlength: 1024,
    required: true,
  },
  address: {
    locality: {
      type: String,
      minlength: 0,
      maxlength: 50,
      required: false,
    },
    state: {
      type: String,
      minlength: 0,
      maxlength: 50,
      required: false,
    },
    zipcode: {
      type: Number,
      minlength: 0,
      maxlength: 10,
      required: false,
    },
    country: {
      type: String,
      minlength: 0,
      maxlength: 50,
      required: false,
    },
  },
  role: {
    type: String,
    enum: ["donor", "seeker", "admin"],
    required: true,
  },
  cdate: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, role: this.role },
    process.env.JWT_PRIVATE_KEY
  );
  return token;
};

module.exports = mongoose.model("User", userSchema);
