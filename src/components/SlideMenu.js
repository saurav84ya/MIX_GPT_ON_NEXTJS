"use client"

import { useMyContext } from '@/context/MyContext';
import { BadgePlus, Search, Settings, User } from 'lucide-react'
import React from 'react'

export default function SlideMenu() {
    const { openMenu, setOpenMenu ,setResponse,auth, promptRequests,promptsHistoryList,  response ,modelSelected , setSelectedModel} = useMyContext();
    return (
        <div className="h-[87dvh]  w-[280px] flex flex-col justify-between 
        bg-[#212121] border-black border  p-4  shadow-xl rounded-md">
            {/* Top Icons */}
            <div className="flex justify-between mb-4">
                <Search className="cursor-pointer" />
                <BadgePlus onClick={ () => { setResponse([]) }  }   className="cursor-pointer" />
            </div>

            {/* Logo */}
            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold">Mix GPT</h1>
            </div>

            {/* Model Select */}
            <div className="mb-6">
      <h2 className="text-lg mb-2 font-semibold">Select Model</h2>
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
    </div>

            {/* History Scrollable */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">History</h2>
                <div className="h-[350px] overflow-y-auto custom-scroll pr-1 space-y-1">
                    {
                        promptsHistoryList?.length == 0 ? <h1> No History </h1> : 

                        promptsHistoryList?.map((item, index) => (
                        <div
                            key={index}
                            className="bg-[#1e1e1e] px-3 py-2 rounded hover:bg-[#2b2b2b]
                             cursor-pointer"
                             onClick={() => promptRequests( item?._id , 'get' ) }
                        >
                            {item?.prompt}
                        </div>
                    ))

                    }
                    
                </div>
            </div>

            {/* Bottom Icons */}
            <div className="flex justify-between items-center mt-auto
             pt-4 px-5 border-t border-[#333]">
                <Settings className="cursor-pointer" />
                <User className="cursor-pointer" />
            </div>
        </div>
    );
}
