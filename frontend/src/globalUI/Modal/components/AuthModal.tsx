import React, { FC, ChangeEvent, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../context/auth/AuthState";
import { useNotification } from "../../../context/notification/NotificationState";
import {
  googleLoginUser,
  loginUser,
  registerUser,
} from "../../../api/auth.api";
import GoogleReCAPTCHA, { ReCAPTCHA } from "react-google-recaptcha";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";

interface Props {
  isLogin: boolean;
}

const AuthModal: FC<Props> = ({ isLogin }) => {
  const { showNotification } = useNotification();
  const { saveUserAuth } = useAuth();
  const history = useHistory();

  const reCaptchaRef = useRef<ReCAPTCHA>(null);

  const [reCaptchaToken, setReCaptchaToken] = useState("");
  const [isShowingPw, setIsShowingPw] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authInfo, setAuthInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  async function handleLoginOrRegisterUser() {
    if (!handleValidateForm()) return;
    setIsSubmitting(true);
    const payload = { ...authInfo, reCaptchaToken };

    try {
      if (isLogin) {
        // login
        const loginRes = await loginUser(payload);
        saveUserAuth(loginRes.data);
        history.push("/dashboard");
      } else {
        // register
        await registerUser(payload);
        setSuccessMsg(
          `Successfully signed up. Activate your account by clicking the verification link we sent to ${authInfo.email}`
        );
        setAuthInfo({
          username: "",
          email: "",
          password: "",
        });

        setIsSubmitting(false);
      }
    } catch (err: any) {
      if (err?.response?.data?.message) {
        setErrMsg(err.response.data.message);
      } else {
        showNotification("error");
      }
      setIsSubmitting(false);
    }
  }

  function handleShowPassword() {
    setIsShowingPw((prevIsShowing) => !prevIsShowing);
  }

  function handleUpdateForm(e: ChangeEvent<HTMLInputElement>) {
    e.persist();
    setAuthInfo((prevInfo) => {
      return {
        ...prevInfo,
        [e.target.id]: e.target.value,
      };
    });
  }

  function handleValidateForm() {
    if (
      (isLogin ? false : !authInfo.username) ||
      !authInfo.email ||
      !authInfo.password
    ) {
      setErrMsg("Please complete all fields");
      return false;
    }

    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(String(authInfo.email).toLowerCase())) {
      setErrMsg("Please enter a valid email");
      return false;
    }

    if (authInfo.password.length < 5) {
      setErrMsg("Password needs to have at least 5 characters");
      return false;
    }

    if (!reCaptchaToken) {
      setErrMsg(`Please tick the "I'm not a robot" checkbox`);
      return false;
    }

    if (errMsg) {
      setErrMsg("");
    }

    return true;
  }

  const isGoogleLoginResponse = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ): response is GoogleLoginResponse => {
    return (
      !!response &&
      typeof response === "object" &&
      !!(response as GoogleLoginResponse).tokenObj
    );
  };

  async function handleGoogleLogin(
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) {
    if (!isGoogleLoginResponse(response)) {
      setErrMsg(`Login failed, please check your network connection`);
      return;
    }

    if (!reCaptchaToken) {
      setErrMsg(`Please tick the "I'm not a robot" checkbox`);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await googleLoginUser({
        tokenId: response.tokenId,
        reCaptchaToken,
      });
      console.log("Google auth:", res.data);
      saveUserAuth(res.data);
      history.push("/dashboard");
    } catch (err: any) {
      if (err?.response?.data?.message) {
        setErrMsg(err.response.data.message);
      } else {
        showNotification("error");
      }
      setIsSubmitting(false);
    }
  }

  return (
    <div className="p-3" data-testid="register-modal">
      {successMsg && (
        <div className={`text-white bg-green-600 p-3 mb-6`}>{successMsg}</div>
      )}

      {/* username */}
      {!isLogin && (
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            value={authInfo.username}
            onChange={handleUpdateForm}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
          />
        </div>
      )}

      {/* email */}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          value={authInfo.email}
          onChange={handleUpdateForm}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="text"
          placeholder="info@example.com"
        />
      </div>

      {/* password */}
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <div className="flex relative items-center justify-center">
          <input
            value={authInfo.password}
            onChange={handleUpdateForm}
            // border-red-500
            className="col-span-8 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type={isShowingPw ? "text" : "password"}
            placeholder="***********"
          />
          <div
            className="col-span-4 absolute cursor-pointer text-xs"
            onClick={handleShowPassword}
            style={{ right: "0.75rem", top: "0.6rem" }}
          >
            {isShowingPw ? "hide" : "show"}
          </div>
        </div>

        {(errMsg ? true : false) && (
          <p
            data-testid="register-err-msg"
            className="text-red-500 text-xs italic"
          >
            {errMsg}
          </p>
        )}
      </div>

      <div className="flex items-center">
        <button
          data-testid="submit-user-register"
          disabled={isSubmitting}
          onClick={handleLoginOrRegisterUser}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          {isLogin ? "Login" : "Register"}
        </button>
      </div>

      <div className="mt-6">
        <GoogleLogin
          disabled={isSubmitting}
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}
          buttonText="Sign in with Google"
          onSuccess={handleGoogleLogin}
          onFailure={handleGoogleLogin}
          cookiePolicy={"single_host_origin"}
        />
      </div>

      <GoogleReCAPTCHA
        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY || ""}
        onChange={() => {
          setReCaptchaToken(reCaptchaRef?.current?.getValue() || "");
        }}
        ref={reCaptchaRef}
      />
    </div>
  );
};

export default AuthModal;
