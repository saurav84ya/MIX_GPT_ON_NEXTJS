"use client"; // only if you're using app directory (not needed for pages)

import { useSession } from "next-auth/react";
import { createContext, useState, useContext, useEffect } from "react";

const MyContext = createContext();

export const MyContextProvider = ({ children }) => {

     const { data: session ,status } = useSession()

const [auth, setAuth] = useState(false);

useEffect(() => {
  if (session) {
    setAuth(true);
  } else {
    setAuth(false);
  }
}, [session]);

  const [isDark, setIsDark] = useState(false);
      const [openMenu, setOpenMenu] = useState(false)

      const [prompt, setPrompt] = useState("");
        const [response, setResponse] = useState([]);
        const [modelSelected , setSelectedModel] = useState("deepseek")

        const [currentPromptSession , setCurrentPromptSession] = useState([null])
  

  const toggleDark = () => setIsDark((prev) => !prev);

  return (
    <MyContext.Provider value={{openMenu, setOpenMenu, prompt , setPrompt ,response, setResponse ,auth ,setAuth
      ,modelSelected , setSelectedModel ,currentPromptSession , setCurrentPromptSession ,session
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
