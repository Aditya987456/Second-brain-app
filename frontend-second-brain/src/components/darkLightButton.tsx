import { useTheme } from "../context/themeContext";
import { Sun, Moon } from "lucide-react";

export const DarkmodeButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
    >
      {theme === "dark" ? <Sun className="w-6 h-6 text-white" /> : <Moon className="w-6 h-6 text-gray-800" />}
    </button>
  );
};
