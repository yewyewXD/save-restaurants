import React, { useMemo } from "react";

const Footer = () => {
  interface ISocialMedia {
    id: number;
    name: string;
    link: string;
  }

  const socialMedia = useMemo((): ISocialMedia[] => {
    return [
      //   {
      //     id: 1,
      //     name: "facebook",
      //     link: "#",
      //   },
      {
        id: 2,
        name: "twitter",
        link: "https://twitter.com/eatery_malaysia",
      },
      //   {
      //     id: 3,
      //     name: "instagram",
      //     link: "#",
      //   },
      //   {
      //     id: 4,
      //     name: "linkedin",
      //     link: "#",
      //   },
    ];
  }, []);

  return (
    <footer className="bg-black text-white flex py-8 w-full justify-center items-center">
      <div>Eatery © All Rights Reserved</div>

      <div>
        {socialMedia.map((social) => (
          <a
            key={social.id}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer"
          >
            <i className={`icon-inno icon-inno_${social.name} ml-3`} />
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
