"use client"

import { useMyContext } from '@/context/MyContext';
import { BadgePlus, BookText, CircleX, LogOut, Menu, Settings, User } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useRef, useEffect, useState } from 'react'

const menus = [
    { icon: <BookText />, label: "My Asks" },
    { icon: <Settings />, label: "LogOut" },
    { icon: <User />, label: "Account" },
    { icon: <LogOut />, label: "LogOut" },
]


export default function UnAuthNav() {

    // const auth = !true



    const [openMenuProfile, setOpenMenuProfile] = useState(false)

    const { openMenu, setOpenMenu, auth, modelSelected,
        setSelectedModel, response ,  setResponse ,session} = useMyContext();

    const router = useRouter();




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
                {!auth ? (
                    <button onClick={ () => { setResponse([]) } }className='cursor-pointer' >
                        <BadgePlus size={40} />
                    </button>
                ) : !openMenu ? (
                    <button onClick={() => setOpenMenu(true)}>
                        <Menu size={40} />
                    </button>
                ) : (
                    <button onClick={() => setOpenMenu(false)}>
                        <CircleX size={40} />
                    </button>
                )}
            </div>

            {auth ? <h1 className='font-bold md:text-2xl text-xl ' >Mix Gpt</h1> :

                <div>
                    <select
                        name="model"
                        value={modelSelected}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        className="w-full bg-[#212121] p-2 rounded text-white font-bold cursor-pointer outline-none"
                    >
                        <option value="deepseek">DeepSeek</option>
                        <option value="llama">Llama</option>
                        <option value="gemini">Gemini</option>
                        <option value="gemma2">Gamma2</option>
                    </select>
                </div>}

            {!auth ?

                <div className='flex gap-5 ' >
                    <button onClick={() => router.push('/signup')} className=' bg-white text-black font-bold p-2 px-3 rounded-2xl  cursor-pointer ' >Log in</button>
                    <button onClick={() => router.push('/signup')} className='hidden xl:flex bg-white text-black font-bold p-2 px-3 rounded-2xl cursor-pointer' >SignUp</button>
                </div> :
                <div className=' relative cursor-pointer select-none ' >
                    <div onClick={() => { setOpenMenuProfile(!openMenuProfile) }} className='w-10 h-10 bg-black flex justify-center items-center rounded-full' >
                        { !session.user.image ? <div>
                            <h1 className='font-bold capitalize' >{ session.user?.name[0] }</h1>
                        </div>
                        : <div>

                            <Image src={session.user.image} width={50} height={50} alt="hii" className='xl rounded-full' />

                        </div>    
                    }
                    </div>



                    {openMenuProfile && <div ref={menuRef} className="absolute top-[60px] md:right-5 right-1 bg-[#212121]  z-50">
                        {/* <div className="rounded-xl border border-black  shadow-lg overflow-hidden  ">
                            {
                                menus.map((item, index) => (
                                    <div
                                        key={index}
                                        className="px-4 py-3 md:text-2xl text-xl flex items-center gap-2 w-[180px] hover:bg-black cursor-pointer select-none"
                                    >
                                        {item.icon} {item.label}
                                    </div>
                                ))}
                        </div> */}

                        <div className="rounded-xl border border-black  shadow-lg overflow-hidden  ">

                          <Link href={'/myAsks'} >  <div
                                className="px-4 py-3 md:text-2xl text-xl flex items-center gap-2 w-[180px] hover:bg-black cursor-pointer select-none"
                            >
                                <BookText /> My Asks
                            </div></Link>

                           <Link href={'/setting'}  >
                            <div
                                className="px-4 py-3 md:text-2xl text-xl flex items-center gap-2 w-[180px] hover:bg-black cursor-pointer select-none"
                            >
                                <Settings /> Settings
                            </div>
</Link>
                            <div
                                className="px-4 py-3 md:text-2xl text-xl flex items-center gap-2 w-[180px] hover:bg-black cursor-pointer select-none"
                            >
                                <User /> Account
                            </div>

                            <div
                                className="px-4 py-3 md:text-2xl text-xl flex items-center gap-2 w-[180px] hover:bg-black cursor-pointer select-none"
                                 onClick={() => signOut("")}
                            >
                                <LogOut /> LogOut
                            </div>
                        </div>


                    </div>
                    }
                </div>

            }
        </div>
    )
}
