import React from "react";

const HowItWorksSection = () => {
  return (
    <section className="w-full py-16" style={{ minHeight: "90vh" }}>
      <div className="container mx-auto">
        <h1 className="leading-none text-4xl font-bold mb-20 text-center">
          How it works
        </h1>

        <div className="grid grid-cols-2 w-full mb-20">
          <div className="flex items-center justify-start">testing 1</div>
          <div className="flex">
            <div className="flex justify-center items-center font-bold pr-12 text-3xl">
              1
            </div>

            <div>
              <div className="text-2xl mb-3 font-bold">Choose your product</div>
              <div>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic
                rerum, officiis mollitia earum, porro adipisci, veniam ea omnis
                eum doloribus pariatur quas mole
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 w-full">
          <div className="order-last flex items-center justify-end">
            testing 1
          </div>
          <div className="flex">
            <div className="flex justify-center items-center font-bold pr-12 text-3xl">
              2
            </div>

            <div>
              <div className="text-2xl mb-3 font-bold">Choose your product</div>
              <div>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic
                rerum, officiis mollitia earum, porro adipisci, veniam ea omnis
                eum doloribus pariatur quas mole
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
