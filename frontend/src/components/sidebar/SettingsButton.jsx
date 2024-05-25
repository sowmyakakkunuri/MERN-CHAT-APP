// src/components/sidebar/SettingsButton.jsx
import React from "react";
import { FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SettingsButton = () => {
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    navigate("/settings");
  };

  return (
    <FaCog
      className="w-7 h-7 text-white cursor-pointer"
      onClick={handleSettingsClick}
    />
  );
};

export default SettingsButton;
