"use client"; // only if you're using app directory (not needed for pages)

import { createContext, useState, useContext } from "react";

const MyContext = createContext();

export const MyContextProvider = ({ children }) => {

  const auth = false

  const [isDark, setIsDark] = useState(false);
      const [openMenu, setOpenMenu] = useState(false)

      const [prompt, setPrompt] = useState("");
        const [response, setResponse] = useState("");
        const [modelSelected , setSelectedModel] = useState("deepseek")

        const [currentPromptSession , setCurrentPromptSession] = useState([null])
  

  const toggleDark = () => setIsDark((prev) => !prev);

  return (
    <MyContext.Provider value={{openMenu, setOpenMenu, prompt, setPrompt ,response, setResponse ,auth
      ,modelSelected , setSelectedModel ,currentPromptSession , setCurrentPromptSession
    }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) throw new Error("useMyContext must be used inside MyContextProvider");
  return context;
};
