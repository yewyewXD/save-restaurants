import React, { useEffect, useState } from "react";
import { verifyUser } from "../../api/auth.api";
import AuthModal from "../../globalUI/Modal/components/AuthModal";
import { getFirstParamValue } from "../../utils/url.utils";

const Login = () => {
  const [verifyMsg, setVerifyMsg] = useState({ message: "", color: "" });

  useEffect(() => {
    const code = getFirstParamValue();

    async function handleVerifyUser() {
      try {
        const res = await verifyUser(code);
        if (res.data?.success) {
          setVerifyMsg({
            message: "Email verification successful, please login",
            color: "green",
          });
        } else {
          setVerifyMsg({
            message: "Email verification failed, please try again",
            color: "red",
          });
        }
      } catch (err) {
        setVerifyMsg({
          message: "Email verification failed, please try again",
          color: "red",
        });
      }
    }

    if (code) {
      handleVerifyUser();
    }
  }, []);

  return (
    <div className="p-10">
      {verifyMsg.message && (
        <div className={`text-white bg-${verifyMsg.color}-600 p-8 mb-14`}>
          {verifyMsg.message}
        </div>
      )}

      <AuthModal isLogin={true} />
    </div>
  );
};

export default Login;
