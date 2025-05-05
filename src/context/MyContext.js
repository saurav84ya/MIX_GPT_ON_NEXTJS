"use client"; // only if you're using app directory (not needed for pages)

import { createContext, useState, useContext } from "react";

const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
      const [openMenu, setOpenMenu] = useState(false)
  

  const toggleDark = () => setIsDark((prev) => !prev);

  return (
    <MyContext.Provider value={{openMenu, setOpenMenu}}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) throw new Error("useMyContext must be used inside MyContextProvider");
  return context;
};
