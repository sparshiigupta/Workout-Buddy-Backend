const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//signup user
// const signupUser = async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res.status(400).json({ message: "Fill all the feilds" });
//   }
//   if (!validator.isEmail(email)) {
//     return res.status(400).json({ message: "Email does not exists" });
//   }
//   if (!validator.isStrongPassword(password)) {
//     return res.status(400).json({ message: "Password not strong enough" });
//   }
//   try {
//     const oldUser = await User.findOne({ email });
//     if (oldUser)
//       return res.status(400).json({ message: "User already exists" });

//     const salt = await bcrypt.genSalt(10);
//     const hashedPass = await bcrypt.hash(password, salt);

//     const newUser = new User({ email, password: hashedPass });
//     if (newUser) await newUser.save();

//     //create token
//     const token = createToken(newUser._id);
//     res.status(200).json({ email, token });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };
// signup a user
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };
