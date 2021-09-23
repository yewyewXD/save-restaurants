import React, { useRef } from "react";
import GoogleReCAPTCHA, { ReCAPTCHA } from "react-google-recaptcha";

interface Props {
  setReCaptchaToken: Function;
}

const ReCaptcha: React.FC<Props> = ({ setReCaptchaToken }) => {
  const reCaptchaRef = useRef<ReCAPTCHA>(null);
  return (
    <GoogleReCAPTCHA
      sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY || ""}
      onChange={() => {
        setReCaptchaToken(reCaptchaRef?.current?.getValue() || "");
      }}
      ref={reCaptchaRef}
    />
  );
};

export default ReCaptcha;
