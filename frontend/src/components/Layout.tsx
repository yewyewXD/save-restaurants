import React, { FC } from "react";

interface Props {
  metaTitle: string;
}

const Layout: FC<Props> = ({ children, metaTitle }) => {
  return (
    <div>
      <div>my meta title is {metaTitle}</div>
      <div>header</div>
      <div>{children}</div>
      <div>footer</div>
    </div>
  );
};

export default Layout;
