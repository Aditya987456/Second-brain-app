import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {

//------here there is function that check to store the initial value of this usestate.
    const [theme, setTheme] = useState<Theme>(() => {
    
    
    // Check saved theme in localStorage
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored) return stored;


    // then check system preference
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }

    // Default to light theme
    return "light";
  });




  // --- Apply theme to <html> and save in localStorage ...
  useEffect(() => {
    const root = window.document.documentElement;

     // Adding class for transition
    root.classList.add("theme-transition");

    root.classList.toggle("dark", theme === "dark");

    localStorage.setItem("theme", theme);


    // after transition it will remove the class
    const timeout = setTimeout(() => {
      root.classList.remove("theme-transition");
    }, 500); 

    return () => clearTimeout(timeout);



  }, [theme]);



  //  Toggle theme-->  function---
  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}





// Custom hook to use theme anywhere---> means we not have to use evrywhere like firstly useContext then use context.somthing...
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
