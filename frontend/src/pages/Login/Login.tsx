import React, { useEffect, useState } from "react";
import { verifyUser } from "../../api/auth.api";
import AuthModal from "../../globalUI/Modal/components/AuthModal";
import { getParsedQueries } from "../../utils/url.utils";

const Login = () => {
  const [verifyMsg, setVerifyMsg] = useState({ message: "", color: "" });

  useEffect(() => {
    const queries = getParsedQueries();
    if (!queries?.code || !queries?.id) {
      return;
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

    handleVerifyUser();
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
