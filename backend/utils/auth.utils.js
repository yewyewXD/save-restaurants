const fetch = require("isomorphic-fetch");
const fs = require("fs");

exports.validateReCAPTCHA = async (reCaptchaToken) => {
  const reCaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.GOOGLE_RECAPTCHA_SECRET}&response=${reCaptchaToken}`;

  const reCaptchaRes = await fetch(reCaptchaUrl, { method: "post" });
  const reCaptchaResJSON = await reCaptchaRes.json();
  return reCaptchaResJSON?.success;
};

exports.validateAuthReCAPTCHA = async (reCaptchaToken) => {
  const reCaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.AUTH_RECAPTCHA_SECRET}&response=${reCaptchaToken}`;

  const reCaptchaRes = await fetch(reCaptchaUrl, { method: "post" });
  const reCaptchaResJSON = await reCaptchaRes.json();
  return reCaptchaResJSON?.success;
};

exports.privateECDSA =
  process.env.NODE_ENV === "production"
    ? Buffer.from(process.env.PRIVATE_ECDSA, "base64").toString()
    : fs.readFileSync("keys/private-key.pem", "utf-8");
