import React from "react";
import { useModal } from "../../../context/modal/ModalState";
import RegisterModal from "../../../globalUI/Modal/components/RegisterModal";

const HeroSection = () => {
  const { handleShowModal } = useModal();

  function showLoginModal() {
    handleShowModal(<div>test login</div>);
  }

  function showRegisterModal() {
    handleShowModal(<RegisterModal />);
  }

  return (
    <section className="flex w-full h-screen justify-center items-center">
      <div>
        <h1>welcome to this website</h1>
        <div className="flex">
          <button
            onClick={showLoginModal}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          >
            Login
          </button>
          <button
            data-testid="register-btn"
            onClick={showRegisterModal}
            className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          >
            Register
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
