// ### it will helps me  ****not get*** frustrated in props drilling saar.


//@ts-ignore
import React, { createContext, useState, ReactNode } from "react";

interface DashboardContextType {
  query: string;
  setQuery: (q: string) => void;
  filter: string;
  setFilter: (f: string) => void;
  showResults: boolean;
  setShowResults: (v: boolean) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (v: boolean) => void;
}

export const DashboardContext = createContext<DashboardContextType | null>(null);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <DashboardContext.Provider
      value={{ query, setQuery, filter, setFilter, showResults, setShowResults, isSidebarOpen, setIsSidebarOpen }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
