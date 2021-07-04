const UserModel = require("../models/user.model");

// @desc Register user
// @route POST /api/user/register
// @access public
exports.registerUser = async (req, res, next) => {
  try {
    const createUserRes = await UserModel.create({
      displayName: "tester",
      email: "tester@mail.com",
      password: "tester",
    });

    console.log(createUserRes);

    return res.status(201).json({
      success: true,
      data: createUserRes, // not used in client side
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
};
