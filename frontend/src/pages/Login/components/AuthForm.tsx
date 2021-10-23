import React, { FC, ChangeEvent, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/auth/AuthState";
import { useNotification } from "../../../context/notification/NotificationState";
import {
  googleLoginUser,
  loginUser,
  registerUser,
} from "../../../api/auth.api";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { isEmailValid } from "../../../utils/form.utils";

interface Location {
  pathname: string;
  state?: {
    referrer: string;
  };
}

const AuthForm: FC = () => {
  const { showNotification } = useNotification();
  const { saveUserAuth, isLoggedIn } = useAuth();
  const history = useHistory();
  const location: Location = useLocation();

  const [isLogin, setIsLogin] = useState(true);
  const [reCaptchaToken, setReCaptchaToken] = useState("");
  const [isShowingPw, setIsShowingPw] = useState(false);
  const [formMessage, setFormMessage] = useState({ text: "", color: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authInfo, setAuthInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  // redirect to "referrer" page after login
  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    const referrer = location.state?.referrer;

    if (referrer && location.pathname !== referrer) {
      history.push({ pathname: referrer, state: {} });
    } else if (location.pathname !== "/dashboard") {
      history.push("/dashboard");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  async function handleLoginOrRegisterUser() {
    if (!handleValidateForm()) return;
    setIsSubmitting(true);
    const payload = { ...authInfo, reCaptchaToken };

    try {
      if (isLogin) {
        // login
        const loginRes = await loginUser(payload);
        saveUserAuth(loginRes.data);
      } else {
        // register
        await registerUser(payload);
        setFormMessage({
          text: `Successfully signed up. Activate your account by clicking the verification link we sent to ${authInfo.email}`,
          color: "green",
        });
        setAuthInfo({
          username: "",
          email: "",
          password: "",
        });

        setIsSubmitting(false);
      }
    } catch (err: any) {
      if (err?.response?.data?.message) {
        setFormMessage({ text: err.response.data.message, color: "red" });
      } else {
        showNotification("error");
      }
      setIsSubmitting(false);
    }
  }

  function handleShowPassword(): void {
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

  function handleValidateForm(): boolean {
    if (
      (isLogin ? false : !authInfo.username) ||
      !authInfo.email ||
      !authInfo.password
    ) {
      setFormMessage({ text: "Please complete all fields", color: "red" });
      return false;
    }

    if (!isEmailValid(authInfo.email)) {
      setFormMessage({ text: "Please enter a valid email", color: "red" });
      return false;
    }

    if (authInfo.password.length < 5) {
      setFormMessage({
        text: "Password needs to have at least 5 characters",
        color: "red",
      });
      return false;
    }

    if (!reCaptchaToken) {
      setFormMessage({
        text: `Please tick the "I'm not a robot" checkbox`,
        color: "red",
      });
      return false;
    }

    if (formMessage.color === "red") {
      setFormMessage({ text: "", color: "" });
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
      setFormMessage({
        text: `Login failed, please check your network connection`,
        color: "red",
      });
      return;
    }

    if (!reCaptchaToken) {
      setFormMessage({
        text: `Please tick the "I'm not a robot" checkbox`,
        color: "red",
      });
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
    } catch (err: any) {
      if (err?.response?.data?.message) {
        setFormMessage({ text: err.response.data.message, color: "red" });
      } else {
        showNotification("error");
      }
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className="w-full"
      data-testid="register-modal"
      onSubmit={handleLoginOrRegisterUser}
    >
      {formMessage.text && (
        <div className={`text-white bg-${formMessage.color}-600 p-3 mb-6`}>
          {formMessage.text}
        </div>
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
      </div>

      <div className="flex items-center">
        <button
          data-testid="submit-user-register"
          disabled={isSubmitting}
          onClick={handleLoginOrRegisterUser}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
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
    </form>
  );
};

export default AuthForm;
