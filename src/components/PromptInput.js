"use clent"

import { Send, SendToBack } from 'lucide-react'
import React from 'react'

export default function PromptInput() {
  return (
    <div className='rounded-xl border border-black md:p-4 p-2 mt-4 shadow-xl ' >
      <textarea className= ' bg-[#303030] md:w-[70vw] w-[90vw] lg:w-[700px] xl:w-[900px] rounded-xl border border-black h-[100px] md:p-4 p-2  '  type="text" />
      <div className='flex justify-between  px-3 mt-3 ' >
       <div>
       <button><SendToBack /></button>
       <button><SendToBack /></button>
       </div>
      <button className='  cursor-pointer ' ><Send  /></button>
      </div>
    </div>
  )
}
