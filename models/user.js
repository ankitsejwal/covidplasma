const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
  phone: {
    type: String,
    minlength: 9,
    maxlength: 10,
    required: true,
  },
  email: {
    type: String,
    minlength: 8,
    maxlength: 50,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 1,
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

userSchema.methods.create = async function (req, role) {
  this.name = req.body.name;
  this.age = req.body.age;
  this.gender = req.body.gender;
  this.bloodGroup = req.body.bloodGroup;
  this.email = req.body.email;
  this.phone = req.body.phone;
  this.password = await this.generateHashedPassword(req.body.password);
  this.address.locality = req.body.locality;
  this.address.state = req.body.state;
  this.address.zipcode = req.body.zipcode;
  this.address.country = req.body.country;
  this.role = role;

  this.save();
};

userSchema.methods.generateHashedPassword = async function (password) {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

module.exports = mongoose.model("User", userSchema);
