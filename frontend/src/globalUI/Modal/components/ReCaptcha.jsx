import React, { useRef, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const ReCaptcha = ({ isSubmittingForm, setReCaptchaToken }) => {
  const reCaptchaRef = useRef();

  async function getReCaptchaValue() {
    const token = await reCaptchaRef.current.executeAsync();
    reCaptchaRef.current.reset();
    setReCaptchaToken(token);
  }

  useEffect(() => {
    if (isSubmittingForm) {
      getReCaptchaValue();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmittingForm]);

  return (
    <ReCAPTCHA
      sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
      ref={reCaptchaRef}
      size="invisible"
    />
  );
};

export default ReCaptcha;
