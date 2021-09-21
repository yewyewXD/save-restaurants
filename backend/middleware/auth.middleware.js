const jwt = require("jsonwebtoken");
const fs = require("fs");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.authToken;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, toLogin: true, referrer: req.get("Referrer") });
    }

    let publicECDSA = "";

    if (process.env.NODE_ENV === "production") {
      publicECDSA = Buffer.from(process.env.PUBLIC_ECDSA, "base64").toString();
    } else {
      publicECDSA = fs.readFileSync("keys/public-key.pem", "utf-8");
    }

    const verifiedToken = jwt.verify(token, publicECDSA, {
      algorithms: ["ES256"],
      issuer: process.env.BACKEND_BASE_URL,
    });
    if (!verifiedToken) {
      return res
        .status(401)
        .json({ success: false, toLogin: true, referrer: req.get("Referrer") });
    }

    req.userId = verifiedToken.userId;

    next();
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
};

module.exports = auth;
