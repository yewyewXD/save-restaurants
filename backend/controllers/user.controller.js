const UserModel = require("../models/user.model");

// @desc Register user
// @route POST /api/user/register
// @access public
exports.registerUser = async (req, res, next) => {
  try {
    const { displayName, email, password } = req.body;

    // Validation
    if (!displayName || !email || !password) {
      return res.status(401).json({
        success: false,
        error: "One or more field is missing",
      });
    }
    const emailExist = await UserModel.findOne({ email });
    if (emailExist) {
      return res.status(401).json({
        success: false,
        error: "This email has been used",
      });
    }
    if (password.length < 5) {
      return res.status(401).json({
        success: false,
        error: "Password needs to be at least 5 characters long",
      });
    }

    // Create user
    const userInfo = {
      displayName,
      email,
      password,
    };
    await UserModel.create(userInfo);

    return res.status(201).json({
      success: true,
      data: { displayName, email }, // not used in client side
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
