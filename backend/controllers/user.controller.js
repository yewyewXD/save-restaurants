const UserModel = require("../models/user.model");

// @desc Get own user information
// @route GET /api/user/me
// @access private
exports.getUserMe = async (req, res, next) => {
  try {
    // Validation
    const existingUser = await UserModel.findOne({ _id: req.userId });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exist",
      });
    }

    return res.status(200).json({
      username: existingUser.username,
      email: existingUser.email,
    });
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
};
