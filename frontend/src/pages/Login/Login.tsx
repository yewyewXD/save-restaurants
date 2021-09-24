import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { resetPassword, verifyUser } from "../../api/auth.api";
import AuthModal from "../../globalUI/Modal/components/AuthModal";
import ReCaptcha from "../../globalUI/ReCaptcha";
import { getParsedQueries } from "../../utils/url.utils";

const Login = () => {
  const [verifyMsg, setVerifyMsg] = useState({ message: "", color: "" });
  const [showPwReset, setShowPwReset] = useState(false);
  const [newPw, setNewPw] = useState("");
  const [reCaptchaToken, setReCaptchaToken] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const queries = getParsedQueries();
  const history = useHistory();

  useEffect(() => {
    if (!queries?.code || !queries?.id) {
      return;
    }

    if (!queries?.reset) {
      setShowPwReset(true);
    }

    // clear code and id queries
    window.history.replaceState(null, "", window.location.pathname);

    async function handleVerifyUser() {
      try {
        await verifyUser({ code: queries.code, userId: queries.id });
        setVerifyMsg({
          message: "Email verification successful, please login",
          color: "green",
        });
      } catch {}
    }

    if (!queries?.reset) {
      handleVerifyUser();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleConfirmNewPw() {
    if (newPw?.length < 5) {
      setErrMsg("Password needs to be at least 5 characters long");
      return;
    }

    if (!reCaptchaToken) {
      setErrMsg(`Please tick the "I'm not a robot" checkbox`);
      return;
    }

    if (errMsg) {
      setErrMsg("");
    }

    setIsSubmitting(true);

    try {
      await resetPassword({
        code: queries?.code,
        userId: queries?.id,
        password: newPw,
        reCaptchaToken,
      });

      setVerifyMsg({
        message: "Password is successfully reset",
        color: "green",
      });

      setTimeout(() => {
        history.push("/dashboard");
      }, 2000);
    } catch (err: any) {
      if (err?.response?.data?.message) {
        setErrMsg(err?.response?.data?.message);
      }

      setIsSubmitting(false);
    }
  }

  return (
    <div className="p-10">
      {verifyMsg.message && (
        <div className={`text-white bg-${verifyMsg.color}-600 p-8 mb-14`}>
          {verifyMsg.message}
        </div>
      )}

      {showPwReset ? (
        <div>
          <div>Please enter your new password</div>
          <input
            type="password"
            value={newPw}
            onChange={(e) => {
              setNewPw(e.target.value);
            }}
          />
          <ReCaptcha setReCaptchaToken={setReCaptchaToken} />
          <button disabled={isSubmitting} onClick={handleConfirmNewPw}>
            Confirm
          </button>
        </div>
      ) : (
        <AuthModal isLogin={true} />
      )}
    </div>
  );
};

export default Login;
