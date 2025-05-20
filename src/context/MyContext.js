"use client"; // only if you're using app directory (not needed for pages)

import { useSession } from "next-auth/react";
import { createContext, useState, useContext, useEffect } from "react";

const MyContext = createContext();

export const MyContextProvider = ({ children }) => {

     const { data: session ,status } = useSession()

const [auth, setAuth] = useState(false);
        const [response, setResponse] = useState([]);

const [promptsHistoryList , setPromptHistoryList] = useState(null)

useEffect(() => {
  console.log("sesion",session)
  if (session) {
    setAuth(true);
  } else {
    setAuth(false);
  }
}, [session]);

useEffect(() =>{
      const fetchUserPrompts = async () => {
      try {
        const res = await fetch(`/api/getUserPrompts?userId=${session.user._id}`);
        const data = await res.json();
        if (data.success) {
          // console.log(data.prompts); // latest prompts (trimmed)
          // Optional: setPrompts(data.prompts); if you want to use in UI
          setPromptHistoryList(data.prompts)
        }
      } catch (err) {
        console.error("Failed to fetch prompts", err);
      }
    };

    fetchUserPrompts(); // ✅ CALLING the function here

},[session ,response ])


 console.log("promptsHistoryList",response);


  const [isDark, setIsDark] = useState(false);
      const [openMenu, setOpenMenu] = useState(false)

      const [prompt, setPrompt] = useState("");
        const [modelSelected , setSelectedModel] = useState("deepseek")

        const [currentPromptSession , setCurrentPromptSession] = useState([null])
  

  const toggleDark = () => setIsDark((prev) => !prev);

  return (
    <MyContext.Provider value={{openMenu, setOpenMenu, prompt , setPrompt ,response, setResponse ,auth ,setAuth,promptsHistoryList
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
