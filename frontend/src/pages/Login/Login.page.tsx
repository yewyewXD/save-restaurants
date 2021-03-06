import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { verifyUser } from "../../api/auth.api";
import AuthForm from "./components/AuthForm";
import { getParsedQueries } from "../../utils/url.utils";
import Navbar from "../Home/components/Navbar";
import AlternativeAuth from "./components/AlternativeAuth";
import { useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth/AuthState";

const Login = () => {
  interface Location {
    pathname: string;
    state?: {
      referrer: string;
    };
  }

  const { isLoggedIn } = useAuth();
  const history = useHistory();
  const location: Location = useLocation();

  const [verifyMsg, setVerifyMsg] = useState({ message: "", color: "" });
  const queries = getParsedQueries();

  useEffect(() => {
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return (
    <main>
      <Navbar />

      <div className="container mx-auto">
        <div className="px-20 py-16">
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

              <AuthForm />
            </div>

            <div className="col-span-1 flex justify-center items-center text-4xl">
              /
            </div>

            <div className="col-span-2 flex justify-center items-center">
              <AlternativeAuth />
            </div>
          </div>

          {/* <div className="w-full text-center mt-12">
            <Link to="/password-reset" className="underline">
              Forgot Password?
            </Link>
          </div> */}
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
