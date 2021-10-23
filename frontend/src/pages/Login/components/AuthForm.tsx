import React, { FC, ChangeEvent, useState, useEffect, useRef } from "react";
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
import GoogleReCAPTCHA, { ReCAPTCHA } from "react-google-recaptcha";

interface Location {
  pathname: string;
  state?: {
    referrer: string;
  };
}

const AuthForm: FC = () => {
  const reCaptchaRef = useRef<ReCAPTCHA>(null);
  const { showNotification } = useNotification();
  const { saveUserAuth, isLoggedIn } = useAuth();
  const history = useHistory();
  const location: Location = useLocation();

  const [isLogin, setIsLogin] = useState(true);
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

  async function handleLoginOrRegisterUser(e: React.SyntheticEvent) {
    e.preventDefault();

    // validation
    if (!handleValidateForm()) return;
    const reCaptchaToken = await reCaptchaRef.current?.executeAsync();
    if (!reCaptchaToken) {
      setFormMessage({
        text: "Something went wrong, please refresh the page",
        color: "red",
      });
      return;
    }
    reCaptchaRef.current?.reset();

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

    setIsSubmitting(true);
    try {
      const res = await googleLoginUser({
        tokenId: response.tokenId,
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
    <form className="w-full" onSubmit={handleLoginOrRegisterUser}>
      {formMessage.text && (
        <div
          className={`text-white bg-${formMessage.color}-600 p-3 mb-4 text-sm`}
        >
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
      <div className="mb-4">
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

      <GoogleReCAPTCHA
        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY || ""}
        size="invisible"
        ref={reCaptchaRef}
      />

      <button
        disabled={isSubmitting}
        onClick={handleLoginOrRegisterUser}
        className="mt-6 bg-primary hover:bg-black hover:border-black border hover:text-white text-black transition duration-200 font-bold py-2 rounded focus:outline-none focus:shadow-outline w-full"
        type="submit"
      >
        {isLogin ? "Login" : "Register"}
      </button>

      {/* toggle sign up & login */}
      <div className="mt-6 text-sm">
        {isLogin ? "Don't have an account?" : "Already have an account?"}

        <span
          className="ml-2 underline cursor-pointer"
          onClick={() => {
            setIsLogin((prevIsLogin) => !prevIsLogin);
            if (formMessage.text) setFormMessage({ text: "", color: "" });
          }}
        >
          {isLogin ? "Sign up" : "Login"}
        </span>
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
