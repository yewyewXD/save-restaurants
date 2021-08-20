import React from "react";
import { useModal } from "../../../context/modal/ModalState";
import AuthModal from "../../../globalUI/Modal/components/AuthModal";

const HeroSection = () => {
  const { handleShowModal } = useModal();

  function showRegisterModal() {
    handleShowModal(<AuthModal isLogin={false} />);
  }

  return (
    <section
      className="flex w-full justify-center items-center"
      style={{ height: "80vh" }}
    >
      <div className="grid md:grid-cols-5 grid-cols-1 container">
        <div className="flex md:col-span-2 col-span-full flex-col md:items-start items-center md:text-left text-center">
          <h1 className="leading-none md:text-6xl text-5xl font-bold">
            Your Restaurant
          </h1>
          <h1 className="leading-none md:text-6xl text-5xl font-bold">
            Our Care
          </h1>
          <div className="text-gray-500 my-4">
            We've programmed our very own IT system for restaurant businesses to
            go online effortlessly
          </div>
          <button
            className="bg-yellow-400 px-9 py-3 rounded text-black hover:text-white hover:bg-black transition duration-200 font-bold"
            onClick={showRegisterModal}
          >
            Get Free Forever
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
