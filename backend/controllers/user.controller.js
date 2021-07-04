const UserModel = require("../models/user.model");

// @desc Register user
// @route POST /api/user/register
// @access public
exports.registerUser = async (req, res, next) => {
  try {
    const { displayName, email, password } = req.body;

    // create user
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
