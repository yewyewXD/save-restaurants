// @desc Get own user information
// @route GET /api/auth/user
// @access private
exports.getUser = async (req, res, next) => {
  console.log(req.userId);
  return;

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
    return res.status(500).json({ message: err.message });
  }
};
