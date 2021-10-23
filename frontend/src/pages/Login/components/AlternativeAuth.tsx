import React, { useState } from "react";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { googleLoginUser } from "../../../api/auth.api";
import { useAuth } from "../../../context/auth/AuthState";
import { useNotification } from "../../../context/notification/NotificationState";
import styles from "./AlternativeAuth.module.scss";

const AlternativeAuth = () => {
  const { showNotification } = useNotification();
  const { saveUserAuth } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const isGoogleLoginResponse = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ): response is GoogleLoginResponse => {
    return (
      !!response &&
      typeof response === "object" &&
      !!(response as GoogleLoginResponse).tokenObj
    );
  };

  async function handleGoogleLogin(response: any) {
    if (response?.error === "popup_closed_by_user") return;

    if (!isGoogleLoginResponse(response)) {
      // setFormMessage({
      //   text: `Login failed, please check your network connection`,
      //   color: "red",
      // });
      showNotification("error");
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
      // err?.response?.data?.message
      showNotification("error");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full">
      <GoogleLogin
        className={styles.GoogleLoginButton}
        disabled={isSubmitting}
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}
        buttonText="Sign in with Google"
        onSuccess={handleGoogleLogin}
        onFailure={handleGoogleLogin}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default AlternativeAuth;
