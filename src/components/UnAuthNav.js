"use client"

import { BadgePlus } from 'lucide-react';
import React from 'react'


export default function UnAuthNav() {
    return (
        <div className='flex justify-between  ' >
            <div>
                <BadgePlus />
            </div>
            <div>
                <select name="model" id="">
                    <option value="chatGpt">Chat Gpt</option>
                    <option value="gemini">Gemini</option>
                    <option value="xx">Xx</option>
                </select>
            </div>
            <div className='flex gap-5 ' >
                <button>Login</button>
                <button className='hidden lg:flex' >SignUp</button>
            </div>
        </div>
    )
}
