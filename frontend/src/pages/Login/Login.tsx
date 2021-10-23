import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { resetPassword, verifyUser } from "../../api/auth.api";
import LoginForm from "./components/LoginForm";
import ReCaptcha from "../../globalUI/ReCaptcha";
import { getParsedQueries } from "../../utils/url.utils";
import Navbar from "../Home/components/Navbar";

const Login = () => {
  const [verifyMsg, setVerifyMsg] = useState({ message: "", color: "" });
  const [showPwReset, setShowPwReset] = useState(false);
  const [newPw, setNewPw] = useState("");
  const [reCaptchaToken, setReCaptchaToken] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [allQueries, setAllQueries] = useState({ code: "", id: "" });

  const queries = getParsedQueries();
  const history = useHistory();

  useEffect(() => {
    if (!queries?.code || !queries?.id) {
      return;
    }

    if (queries?.reset) {
      setShowPwReset(true);
      setAllQueries({ code: queries?.code, id: queries?.id });
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
        code: allQueries?.code,
        userId: allQueries?.id,
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
    <main>
      <Navbar />

      <div className="container mx-auto">
        <div className="p-20">
          <h1 className="leading-none text-4xl font-bold mb-4 text-center">
            Login to Your Account
          </h1>
          <p className="text-gray-700 text-center px-20 mb-12">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Cupiditate, ratione illo aspernatur debitis provident veniam quidem
            dicta nam aperiam temporibus.
          </p>

          <div className="grid grid-cols-5">
            <div className="col-span-2 flex justify-center items-center">
              {verifyMsg.message && (
                <div
                  className={`text-white bg-${verifyMsg.color}-600 p-8 mb-14`}
                >
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
                <div>
                  <LoginForm isLogin={true} />
                </div>
              )}
            </div>
            <div className="col-span-1 flex justify-center items-center text-4xl">
              /
            </div>
            <div className="col-span-2 flex justify-center items-center">
              alternative login
            </div>
          </div>

          <div className="w-full text-center mt-12">
            <Link to="/password-reset" className="underline">
              Forgot Password?
            </Link>
          </div>
        </div>

        <footer className="w-full flex justify-between py-10 text-gray-700 font-semibold text-sm">
          <span>Privacy Policy</span>
          <span>Copyright @ Eatery Malaysia 2021</span>
        </footer>
      </div>
    </main>
  );
};

export default Login;
