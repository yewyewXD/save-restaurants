const UserModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// @desc Register user
// @route POST /api/auth/register
// @access public
exports.registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "One or more field is missing",
      });
    }
    const emailExist = await UserModel.findOne({ email });
    if (emailExist) {
      return res.status(400).json({
        success: false,
        message: "This email has been used",
      });
    }
    if (password.length < 5) {
      return res.status(400).json({
        success: false,
        message: "Password needs to be at least 5 characters long",
      });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 12);
    const userInfo = {
      username,
      email,
      password: hashedPassword,
    };
    const addedUser = await UserModel.create(userInfo);

    const jwtToken = jwt.sign(
      { email: addedUser.email, id: addedUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      username: addedUser.username,
      email: addedUser.email,
      token: jwtToken,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// @desc Login user
// @route POST /api/auth/login
// @access public
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validation
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    if (existingUser.googleId) {
      return res.status(400).json({
        success: false,
        message: "Please sign in with Google",
      });
    }

    const verified = await bcrypt.compare(password, existingUser.password);
    if (!verified) {
      return res.status(400).json({
        success: false,
        message: "Password is incorrect",
      });
    }

    const jwtToken = jwt.sign(
      { email: existingUser.email, id: existingUser.id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      username: existingUser.username,
      email: existingUser.email,
      token: jwtToken,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// @desc Login / Register user with Google
// @route POST /api/auth/google-login
// @access public
exports.googleLoginUser = async (req, res, next) => {
  try {
    const { tokenId } = req.body;

    const googleRes = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email_verified, name, sub, email } = googleRes.payload;

    if (!email_verified) {
      return res.status(400).json({
        success: false,
        message: "Email is not verified by Google",
      });
    }

    //     const userExists = await UserModel.findOne({ googleId:sub });
    //       if (!userExists) {
    // const userInfo = {username: name, email, googleId:sub,password: 'notARealPassword'}
    //     const addedUser = await UserModel.create();
    //   }

    //     // Validation
    //     const existingUser = await UserModel.findOne({ email });
    //     if (!existingUser) {
    //       return res.status(400).json({
    //         success: false,
    //         message: "User does not exist",
    //       });
    //     }

    // const verified = await bcrypt.compare(password, existingUser.password);
    // if (!verified) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Password is incorrect",
    //   });
    // }

    // const jwtToken = jwt.sign(
    //   { email: existingUser.email, id: existingUser.id },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "24h" }
    // );

    return res.status(200).json({
      username: name,
      email,
      tokenId,
      data: googleRes.payload,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
