import React, { FC, ChangeEvent, useState, useRef } from "react";
import { useAuth } from "../../../context/auth/AuthState";
import { useNotification } from "../../../context/notification/NotificationState";
import { loginUser, registerUser } from "../../../api/auth.api";

import { isEmailValid } from "../../../utils/form.utils";
import GoogleReCAPTCHA, { ReCAPTCHA } from "react-google-recaptcha";

const AuthForm: FC = () => {
  const reCaptchaRef = useRef<ReCAPTCHA>(null);
  const { showNotification } = useNotification();
  const { saveUserAuth } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [isShowingPw, setIsShowingPw] = useState(false);
  const [formMessage, setFormMessage] = useState({ text: "", color: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authInfo, setAuthInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

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

      <GoogleReCAPTCHA
        sitekey={process.env.REACT_APP_AUTH_RECAPTCHA_SITE_KEY || ""}
        size="invisible"
        ref={reCaptchaRef}
      />

      <button
        disabled={isSubmitting}
        onClick={handleLoginOrRegisterUser}
        className="bg-primary hover:bg-black hover:border-black border hover:text-white text-black transition duration-200 font-bold py-2 rounded focus:outline-none focus:shadow-outline w-full"
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
    </form>
  );
};

export default AuthForm;
