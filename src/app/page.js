"use client"

import PromptInput from "@/components/PromptInput";
import ResChatGpt from "@/components/ResChatGpt";
import SlideMenu from "@/components/SlideMenu";
import { useMyContext } from "@/context/MyContext";
import { useEffect, useRef } from "react";

export default function Home() {
  // const res = false
  // const  = !true

   const { openMenu, setOpenMenu ,auth ,  response ,modelSlected , setSlectedModel} = useMyContext();


   const menuRef = useRef(null);
       useEffect(() => {
           const handleClickOutside = (event) => {
             if (menuRef.current && !menuRef.current.contains(event.target)) {
              setOpenMenu(false);
             }
           };
       
           document.addEventListener("mousedown", handleClickOutside);
           return () => document.removeEventListener("mousedown", handleClickOutside);
         }, []);

  return (
    <div className="relative flex "  >

      { openMenu  && auth  ? <div ref={menuRef} className="absolute  z-20 lg:relative bg-[#212121]  " >
        <SlideMenu/>
      </div> : null}

      <div className={`flex-1  ${auth ? "" : "mx-auto"} `} >

        <div className={` relative  max-w-[1024px] mx-auto   h-[90dvh] flex flex-col items-center  ${!response ?   'justify-center' : ""}  `}   >

          <div>
            <div>
              {response ? <ResChatGpt response={response}  /> : <h1 className="font-bold" >What can I help with?</h1>}
            </div>

          </div>

          <div className={` ${response ? " absolute bottom-2   " : ""} `} >
            <PromptInput />
          </div>

        </div>


      </div>


      {/* <h1 className="text-center" >MixGpt can make mistakes. Check important info</h1> */}
    </div>
  );
}
