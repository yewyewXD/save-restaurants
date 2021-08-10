import React, { FC } from "react";
import { useAuth } from "../../context/auth/AuthState";
import HeroSection from "./components/HeroSection";

const Home: FC = () => {
  const { userInfo, isLoggedIn, clearUserAuth } = useAuth();
  return (
    <main>
      <nav className="h-12 border-b border-black">
        <div className="my-2 h-full w-full flex justify-between items-center mx-5">
          <div>
            {isLoggedIn
              ? `Welcome back, ${userInfo.username}!`
              : "You are not logged in"}
          </div>

          {isLoggedIn && (
            <button
              onClick={clearUserAuth}
              data-testid="register-btn"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      <HeroSection />
    </main>
  );
};

export default Home;
