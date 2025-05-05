"use client"

import { useMyContext } from '@/context/MyContext';
import { BadgePlus, BookText, LogOut, Menu, Settings, User } from 'lucide-react';
import React, {  useRef, useEffect, useState } from 'react'

const menus = [
    { icon: <BookText />, label: "My Asks" },
    { icon: <Settings />, label: "Setting" },
    { icon: <User />, label: "Account" },
    { icon: <LogOut />, label: "LogOut" },
]


export default function UnAuthNav() {

    const auth = true

    const [openMenuProfile, setOpenMenuProfile] = useState(false)

    const { openMenu, setOpenMenu} = useMyContext();




    // autoMenuCloseLogic
    const menuRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (menuRef.current && !menuRef.current.contains(event.target)) {
            setOpenMenuProfile(false);
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }, []);
    

    return (
        <div className='flex justify-between p-4 ' >
            <div>
                {!auth ? <button><BadgePlus size={40} /></button> :
                    <button onClick={() => setOpenMenu(!openMenu)}  ><Menu size={40} /></button>}

            </div>
            <div className=' border-r-pink-500 border-l-pink-500border-r-pink-500 border-b-pink-500border-r-pink-500 shadow-3xl rounded-4xl ' >
                <select name="model" id=" " className='font-bold text-xl lg:text-2xl bg-[#212121] p-2 cursor-pointer ' >
                    <option value="chatGpt">Chat Gpt</option>
                    <option value="gemini">Gemini</option>
                    <option value="gamma">Gamma</option>
                </select>
            </div>
            {!auth ?

                <div className='flex gap-5 ' >
                    <button className=' bg-white text-black font-bold p-2 px-3 rounded-2xl  cursor-pointer ' >Log in</button>
                    <button className='hidden lg:flex bg-white text-black font-bold p-2 px-3 rounded-2xl cursor-pointer' >SignUp</button>
                </div> :
                <div className=' relative cursor-pointer select-none ' >
                    <div onClick={() => { setOpenMenuProfile(!openMenuProfile) }} className='w-10 h-10 bg-black flex justify-center items-center rounded-full' >
                        <div>
                            <h1 className='font-bold' >A</h1>
                        </div>
                    </div>

                    

                    { openMenuProfile && <div ref={menuRef} className="absolute top-[60px] md:right-5 right-1  z-50">
                        <div className="rounded-xl border border-black  shadow-lg overflow-hidden  ">
                            {
                            menus.map((item, index) => (
                                <div
                                    key={index}
                                    className="px-4 py-3 md:text-2xl text-xl flex items-center gap-2 w-[180px] hover:bg-black cursor-pointer select-none"
                                >
                                    {item.icon} {item.label}
                                </div>
                            ))}
                        </div>
                    </div>
                    }
                </div>

            }
        </div>
    )
}
