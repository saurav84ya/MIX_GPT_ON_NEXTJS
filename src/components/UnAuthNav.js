"use client"

import { BadgePlus } from 'lucide-react';
import React from 'react'


export default function UnAuthNav() {
    return (
        <div className='flex justify-between p-4 ' >
            <div>
                <BadgePlus size={40} />
            </div>
            <div className=' border-r-pink-500 border-l-pink-500border-r-pink-500 border-b-pink-500border-r-pink-500 shadow-3xl rounded-4xl ' >
                <select name="model" id=" " className='font-bold text-xl lg:text-2xl bg-[#212121] p-2 cursor-pointer ' >
                    <option value="chatGpt">Chat Gpt</option>
                    <option value="gemini">Gemini</option>
                    <option value="xx">Xx</option>
                </select>
            </div>
            <div className='flex gap-5 ' >
                <button className=' bg-white text-black font-bold p-2 px-3 rounded-2xl  cursor-pointer ' >Log in</button>
                <button className='hidden lg:flex bg-white text-black font-bold p-2 px-3 rounded-2xl cursor-pointer' >SignUp</button>
            </div>
        </div>
    )
}
