const jwt = require("jsonwebtoken");
const fs = require("fs");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.authToken;
    if (!token) {
      return res
        .status(401)
        .json({ redirect: "/login", next: req.get("Referrer") });
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
        .json({ redirect: "/login", next: req.get("Referrer") });
    }

    req.userId = verifiedToken.userId;

    next();
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = auth;
