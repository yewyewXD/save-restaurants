import React, { FC, ChangeEvent, useState } from "react";
import { useAuth } from "../../../context/auth/AuthState";
import { useModal } from "../../../context/modal/ModalState";
import { useNotification } from "../../../context/notification/NotificationState";
import {
  googleLoginUser,
  loginUser,
  registerUser,
} from "../../../api/auth.api";
import ReCaptcha from "./ReCaptcha";
const { GoogleLogin } = require("react-google-login");

interface Props {
  isLogin: boolean;
}

interface googleResponse {
  profileObj: {
    email: string;
    name: string;
  };
  tokenId: string;
}

const AuthModal: FC<Props> = ({ isLogin }) => {
  const { showNotification } = useNotification();
  const { saveUserAuth } = useAuth();
  const { handleHideModal } = useModal();

  const [reCaptchaToken, setReCaptchaToken] = useState("");
  const [isShowingPw, setIsShowingPw] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authInfo, setAuthInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  async function handleLoginOrRegisterUser() {
    if (!handleValidateForm()) return;
    setIsSubmitting(true);
    if (!reCaptchaToken) handleLoginOrRegisterUser();

    const payload = { ...authInfo, reCaptchaToken };

    try {
      let res: any = {};
      if (isLogin) {
        res = await loginUser(payload);
      } else {
        res = await registerUser(payload);
      }
      console.log("User auth:", res.data);
      saveUserAuth(res.data);

      handleHideModal();
      setIsSubmitting(false);
    } catch (err) {
      console.log(err?.response?.data);
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

    if (errMsg) {
      setErrMsg("");
    }

    return true;
  }

  async function handleGoogleLogin(response: googleResponse) {
    setIsSubmitting(true);
    try {
      const res = await googleLoginUser({
        tokenId: response.tokenId,
      });
      console.log("Google auth:", res.data);
      saveUserAuth(res.data);

      handleHideModal();
      setIsSubmitting(false);
    } catch (err) {
      console.log(err?.response?.data);
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

      <div className="mb-6">
        <ReCaptcha
          isSubmittingForm={isSubmitting}
          setReCaptchaToken={setReCaptchaToken}
        />
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
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Sign in with Google"
          onSuccess={handleGoogleLogin}
          onFailure={handleGoogleLogin}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </div>
  );
};

export default AuthModal;
