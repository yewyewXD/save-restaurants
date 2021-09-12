import React from "react";
import { useParams } from "react-router-dom";

interface Params {
  id: string;
}

const SiteSingle = () => {
  const { id }: Params = useParams();
  return <div>my site {id}</div>;
};

export default SiteSingle;
