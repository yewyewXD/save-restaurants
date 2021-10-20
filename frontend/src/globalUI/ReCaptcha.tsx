import React, { useRef } from "react";
import GoogleReCAPTCHA, { ReCAPTCHA } from "react-google-recaptcha";

interface IProps {
  setReCaptchaToken: Function;
}

const ReCaptcha: React.FC<IProps> = ({ setReCaptchaToken }) => {
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
