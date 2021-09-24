import React, { useState } from "react";
import { sendPasswordResetLink } from "../api/auth.api";
import ReCaptcha from "../globalUI/ReCaptcha";
import { isEmailValid } from "../utils/form.utils";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [reCaptchaToken, setReCaptchaToken] = useState("");

  async function handlePasswordReset() {
    if (!isEmailValid(email)) {
      setErrMsg("Please enter a valid email");
      return;
    }

    if (!reCaptchaToken) {
      setErrMsg(`Please tick the "I'm not a robot" checkbox`);
      return;
    }

    setIsSubmitting(true);
    if (errMsg) {
      setErrMsg("");
    }

    try {
      await sendPasswordResetLink({ email, reCaptchaToken });
      setIsEmailSent(true);
      setIsSubmitting(false);
    } catch (err: any) {
      if (err?.response?.data?.message) {
        setErrMsg(err.response.data.message);
      }
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      {(errMsg || isEmailSent) && (
        <div
          className={`bg-${errMsg ? "red" : "green"}-600 mb-6 p-3 text-white`}
        >
          {errMsg ||
            "Action success. If the account exists, we will send a password reset link."}
        </div>
      )}

      <input
        type="text"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <button disabled={isSubmitting} onClick={handlePasswordReset}>
        Send password reset link
      </button>

      <ReCaptcha setReCaptchaToken={setReCaptchaToken} />
    </div>
  );
};

export default PasswordReset;
