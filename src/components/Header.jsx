
import React from "react";
import TitleSection from "./TitleSection";
import ToggleSwitch from "./ToggleSwitch";
import { useAppContext } from "../context/AppContext";

const Header = () => {
  const { showFavorites, toggleShowFavorites } = useAppContext();

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6 border-b border-gray-200">
      <TitleSection />
      <ToggleSwitch
        label={showFavorites ? "Showing Favorites" : "Show Favorites"}
        isActive={showFavorites}
        onToggle={toggleShowFavorites}
      />
    </header>
  );
};

export default Header;
