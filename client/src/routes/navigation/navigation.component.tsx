import React from "react";
import { Outlet } from "react-router-dom";

const Navigation = () => {
  return (
    <>
<h1>Navigation</h1>
      <Outlet />
    </>
  );
};

export default Navigation;
