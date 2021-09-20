const fetch = require("isomorphic-fetch");

exports.validateReCAPTCHA = async (reCaptchaToken) => {
  const reCaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.GOOGLE_RECAPTCHA_SECRET}&response=${reCaptchaToken}`;

  const reCaptchaRes = await fetch(reCaptchaUrl, { method: "post" });
  const reCaptchaResJSON = await reCaptchaRes.json();
  return reCaptchaResJSON?.success;
};
