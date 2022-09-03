import React from "react";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem("stakeAddress", JSON.stringify(""));
    localStorage.setItem("changeAddress", JSON.stringify(""));
    navigate("/");
  };

  return <MdLogout onClick={handleLogout} />;
};

export default LogoutButton;
