const UserModel = require("../models/user.model");
const bcrypt = require("bcryptjs");

// @desc Register user
// @route POST /api/user/register
// @access public
exports.registerUser = async (req, res, next) => {
  try {
    const { displayName, email, password } = req.body;

    // Validation
    if (!displayName || !email || !password) {
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
      displayName,
      email,
      password: hashedPassword,
    };
    await UserModel.create(userInfo);

    return res.status(200).json({
      success: true,
      data: { displayName, email }, // not used in client side
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// @desc Login user
// @route POST /api/user/login
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
    const verified = await bcrypt.compare(password, existingUser.password);
    if (!verified) {
      return res.status(400).json({
        success: false,
        message: "Password is incorrect",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        user: {
          userId: existingUser.id,
          displayName: existingUser.displayName,
          email: existingUser.email,
        },
      },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
