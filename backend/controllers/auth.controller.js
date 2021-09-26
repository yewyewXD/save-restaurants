const UserModel = require("../models/user.model");
const VerificationCodeModel = require("../models/verificationCode.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const { validateReCAPTCHA, privateECDSA } = require("../utils/auth.utils");
const { getFull6HFromNow } = require("../utils/day.utils");
const crypto = require("crypto");
const { sendMail } = require("../utils/mail.utils");

// @desc Register user
// @route POST /api/auth/register
// @access public
exports.registerUser = async (req, res, next) => {
  try {
    const { username, email, password, reCaptchaToken } = req.body;

    // Validation
    if (!validateReCAPTCHA(reCaptchaToken)) {
      return res.status(403).json({
        success: false,
        message: "Login interrupted, please refresh the page",
      });
    }

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "One or more field is missing",
      });
    }
    const userExist = await UserModel.find({ $or: [{ email }, { username }] });
    if (userExist.length) {
      return res.status(400).json({
        success: false,
        message: "Email or username is already taken",
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

    // create and send email verification code
    const verificationCode = crypto.randomBytes(32).toString("hex");
    const hashedCode = await bcrypt.hash(verificationCode, 12);
    await VerificationCodeModel.create({
      user: addedUser._id,
      code: hashedCode,
    });
    sendMail({
      to: addedUser.email,
      subject: "Please verify your email",
      html: `Hello,<br> Please Click on the link to verify your email.<br><a target="_blank" rel="noopener noreferrer" href="${process.env.FRONTEND_BASE_URL}/login?code=${verificationCode}&id=${addedUser._id}">Click here to verify</a>`,
    });

    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
};

// @desc Login user
// @route POST /api/auth/login
// @access public
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password, reCaptchaToken } = req.body;

    // Validation
    if (!validateReCAPTCHA(reCaptchaToken)) {
      return res.status(403).json({
        success: false,
        message: "Login interrupted, please refresh the page",
      });
    }

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

    if (!existingUser.isVerified) {
      return res.status(400).json({
        success: false,
        message:
          "You are not verified, please check your email for the verification link",
      });
    }

    const verified = await bcrypt.compare(password, existingUser.password);
    if (!verified) {
      return res.status(400).json({
        success: false,
        message: "Password is incorrect",
      });
    }

    const sixHoursFromNow = getFull6HFromNow();
    const jwtToken = jwt.sign(
      { username: existingUser.username, userId: existingUser._id },
      privateECDSA,
      {
        expiresIn: sixHoursFromNow.ms,
        algorithm: "ES256",
        issuer: process.env.BACKEND_BASE_URL,
      }
    );

    return res
      .status(200)
      .cookie("authToken", jwtToken, {
        httpOnly: true,
        expires: sixHoursFromNow.gmt,
        sameSite: "Strict",
        domain: process.env.FRONTEND_BASE_URL,
      })
      .json({
        user: {
          username: existingUser.username,
        },
        expiry: sixHoursFromNow.ms,
      });
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
};

// @desc Login or register user with Google
// @route POST /api/auth/google-login
// @access public
exports.googleLoginUser = async (req, res, next) => {
  try {
    const { tokenId, reCaptchaToken } = req.body;

    if (!validateReCAPTCHA(reCaptchaToken)) {
      return res.status(403).json({
        success: false,
        message: "Login interrupted, please refresh the page",
      });
    }

    const googleRes = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const {
      email_verified,
      name: googleUsername,
      sub,
      email,
    } = googleRes.payload;

    if (!email_verified) {
      return res.status(400).json({
        success: false,
        message: "Email is not verified by Google",
      });
    }

    const existingUser = await UserModel.findOne({ googleId: sub });
    let jwtToken = "";
    const sixHoursFromNow = getFull6HFromNow();
    if (!existingUser) {
      // create user
      const userInfo = {
        email,
        googleId: sub,
        password: "notARealPassword",
        isVerified: true,
      };
      const addedUser = await UserModel.create(userInfo);

      jwtToken = jwt.sign(
        { username: googleUsername, userId: addedUser._id },
        privateECDSA,
        {
          expiresIn: sixHoursFromNow.ms,
          algorithm: "ES256",
          issuer: process.env.BACKEND_BASE_URL,
        }
      );
    } else {
      // login user
      jwtToken = jwt.sign(
        { username: googleUsername, userId: existingUser._id },
        privateECDSA,
        {
          expiresIn: sixHoursFromNow.ms,
          algorithm: "ES256",
          issuer: process.env.BACKEND_BASE_URL,
        }
      );
    }

    return res
      .status(200)
      .cookie("authToken", jwtToken, {
        httpOnly: true,
        expires: sixHoursFromNow.gmt,
        sameSite: "Strict",
        domain: process.env.FRONTEND_BASE_URL,
      })
      .json({
        user: {
          username: googleUsername,
        },
        expiry: sixHoursFromNow.ms,
      });
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
};

// @desc Logout user
// @route POST /api/auth/logout
// @access public
exports.logoutUser = async (req, res, next) => {
  try {
    return res.status(200).clearCookie("authToken").json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
};

// @desc Verify email of user
// @route POST /api/auth/verify
// @access public
exports.verifyUser = async (req, res, next) => {
  try {
    const { code, userId } = req.body;

    if (!code || !userId) {
      return res.status(400).json({
        success: false,
        message: "Verification link is invalid or expired",
      });
    }

    const verificationToken = await VerificationCodeModel.findOne({
      user: userId,
    });
    if (!verificationToken) {
      return res.status(400).json({
        success: false,
        message: "Verification link is invalid or expired",
      });
    }

    const tokenIsValid = await bcrypt.compare(code, verificationToken.code);
    if (!tokenIsValid) {
      return res.status(400).json({
        success: false,
        message: "Verification link is invalid or expired",
      });
    }

    const updatedUser = await UserModel.findOneAndUpdate(
      {
        _id: userId,
      },
      { $set: { isVerified: true } },
      { new: true }
    );
    sendMail({
      to: updatedUser.email,
      subject: "Welcome aboard",
      html: `Congratulations, you are verified!`,
    });

    await verificationToken.deleteOne();

    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
};

// @desc Send password reset link
// @route POST /api/auth/get-reset
// @access public
exports.sendPasswordResetLink = async (req, res, next) => {
  try {
    const { email, reCaptchaToken } = req.body;

    // Validation
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }
    if (!validateReCAPTCHA(reCaptchaToken)) {
      return res.status(403).json({
        success: false,
        message: "Request interrupted, please refresh the page",
      });
    }

    const existingUser = await UserModel.findOne({ email });
    if (!existingUser || !existingUser?.isVerified || existingUser?.googleId) {
      return res.status(200).json({
        success: true,
      });
    }

    // create and send email verification code
    const verificationCode = crypto.randomBytes(32).toString("hex");
    const hashedCode = await bcrypt.hash(verificationCode, 12);
    await VerificationCodeModel.create({
      user: existingUser._id,
      code: hashedCode,
    });
    sendMail({
      to: existingUser.email,
      subject: "Password reset link",
      html: `Hello,<br> Please Click on the link to reset your password.<br><a target="_blank" rel="noopener noreferrer" href="${process.env.FRONTEND_BASE_URL}/login?code=${verificationCode}&id=${existingUser._id}&reset=true">Reset my password</a>`,
    });

    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
};

// @desc Reset password and login user
// @route POST /api/auth/reset
// @access public
exports.resetPassword = async (req, res, next) => {
  try {
    const { userId, reCaptchaToken, code, password } = req.body;

    // Validation
    if (!userId || !code) {
      return res.status(400).json({
        success: false,
        message:
          "Error occurred, please click the password reset link in your email again",
      });
    }

    if (password?.length < 5) {
      return res.status(400).json({
        success: false,
        message: "Password has to be 5 characters or longer",
      });
    }

    if (!validateReCAPTCHA(reCaptchaToken)) {
      return res.status(403).json({
        success: false,
        message: "Request interrupted, please refresh the page",
      });
    }

    const verificationToken = await VerificationCodeModel.findOne({
      user: userId,
    });
    if (!verificationToken) {
      return res.status(403).json({
        success: false,
        message: "Verification link is invalid or expired",
      });
    }

    const tokenIsValid = await bcrypt.compare(code, verificationToken.code);
    if (!tokenIsValid) {
      return res.status(403).json({
        success: false,
        message: "Verification link is invalid or expired",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const updatedUser = await UserModel.findOneAndUpdate(
      {
        _id: userId,
      },
      { $set: { password: hashedPassword } },
      { new: true }
    );
    sendMail({
      to: updatedUser.email,
      subject: "Password reset confirmation",
      html: `Your password is successfully reset`,
    });

    await verificationToken.deleteOne();

    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
};
