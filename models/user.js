const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 50,
    lowercase: true,
    trim: true,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    trim: true,
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
    maxlength: 13,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    minlength: 8,
    maxlength: 50,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1024,
    required: true,
  },
  address: {
    locality: {
      type: String,
      minlength: 0,
      maxlength: 50,
      lowercase: true,
      trim: true,
      required: false,
    },
    state: {
      type: String,
      minlength: 0,
      maxlength: 50,
      lowercase: true,
      trim: true,
      required: false,
    },
    country: {
      type: String,
      minlength: 0,
      maxlength: 50,
      lowercase: true,
      trim: true,
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
  this.phone = req.body.phone;
  this.email = req.body.email;
  this.password = await this.generateHashedPassword(req.body.password);
  this.address.locality = req.body.locality;
  this.address.state = req.body.state;
  this.address.country = req.body.country;
  this.role = role;

  this.save();
};

userSchema.methods.generateHashedPassword = async function (password) {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

userSchema.methods.validateData = function (data) {
  const schema = Joi.object({
    name: Joi.string().trim().lowercase().min(3).max(50).required(),
    age: Joi.number().min(16).max(99).required(),
    gender: Joi.string().trim().required(),
    bloodGroup: Joi.string().trim().required(),
    phone: Joi.string().trim().min(9).max(13).required(),
    email: Joi.string().trim().email().lowercase().min(8).max(50).required(),
    password: Joi.string().trim().min(5).max(100).required(),
    repeat_password: Joi.ref("password"),
    address: {
      locality: Joi.string().trim().lowercase().required(),
      state: Joi.string().trim().lowercase().required(),
      country: Joi.string().trim().lowercase().required(),
    },
  });

  return schema.validate(data);
};

module.exports = mongoose.model("User", userSchema);
