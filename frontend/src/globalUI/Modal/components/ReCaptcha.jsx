import React, { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const ReCaptcha = () => {
  const reCaptchaRef = useRef();

  function getReCaptchaValue() {
    console.log(reCaptchaRef.current.getValue());
  }

  return (
    <ReCAPTCHA
      sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
      ref={reCaptchaRef}
      onChange={getReCaptchaValue}
    />
  );
};

export default ReCaptcha;
