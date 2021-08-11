import React, { useRef, useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const ReCaptcha = ({ isSubmittingForm, setReCaptchaToken }) => {
  const [hasVerified, setHasVerified] = useState(false);
  const reCaptchaRef = useRef();

  async function getReCaptchaValue() {
    const token = await reCaptchaRef.current.executeAsync();
    setReCaptchaToken(token);
    setHasVerified(true);
    reCaptchaRef.current.reset();
  }

  useEffect(() => {
    if (isSubmittingForm && !hasVerified) {
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
