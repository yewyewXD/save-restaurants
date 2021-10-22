import React from "react";

const HowItWorksSection = () => {
  const walkthrough = [
    {
      id: 1,
      title: "Choose a template",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique adipisci voluptas earum tenetur rerum iure ratione unde ab ad numquam!",
      image: "/images/choose-template.png",
    },
    {
      id: 2,
      title: "Customize template & add menu",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique adipisci voluptas earum tenetur rerum iure ratione unde ab ad numquam!",
      image: "/images/customize-template.png",
      reversed: true,
    },

    {
      id: 3,
      title: "Publish your website",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique adipisci voluptas earum tenetur rerum iure ratione unde ab ad numquam!",
      image: "/images/publish-template.png",
    },

    {
      id: 4,
      title: "Upgrade your website",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique adipisci voluptas earum tenetur rerum iure ratione unde ab ad numquam!",
      image: "/images/level-up.png",
      reversed: true,
    },
  ];
  return (
    <section className="w-full py-16" style={{ minHeight: "90vh" }}>
      <div className="container mx-auto">
        <h1 className="leading-none text-4xl font-bold mb-20 text-center">
          How it works
        </h1>

        {walkthrough.map((step) => (
          <div className="grid grid-cols-2 w-full mb-10" key={step.id}>
            <div
              className={`${
                step.reversed ? "order-last justify-end" : "justify-start"
              } flex items-center`}
            >
              <img src={step.image} alt="" />
            </div>
            <div className="flex items-center">
              <div className="flex justify-center items-center font-bold pr-12 text-3xl">
                {step.id}
              </div>

              <div>
                <div className="text-2xl mb-3 font-bold">{step.title}</div>
                <div>{step.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
