'use client'

import { useMyContext } from '@/context/MyContext'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function Page() {

    const {promptsHistoryList ,promptRequests ,session,status }  = useMyContext()

    const router = useRouter();

    useEffect(() => {
      if(status == 'loading' ) return;

      if(!session){
        router.push('/signup')
      }

    } , [session , status])

     if (!session) {
    return null; // don't show UI until redirect or session is available
  }


  const formatDate = (dateStr) => {
    const options = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata'
    };
    return new Date(dateStr).toLocaleString('en-IN', options);
  };




    console.log("promptsHistoryList",promptsHistoryList)
 return (
      <div className="h-[100dvh] max-w-[1024px] mx-auto p-4 overflow-y-auto custom-scroll  space-y-4">


{
  promptsHistoryList?.length === 0 ? (
    <div className="flex items-center justify-center h-full px-4">
      <div className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-8 py-6 rounded-2xl shadow-lg w-full max-w-md text-center">
        <p className="text-lg font-semibold">🚫 No History Found</p>
        <p className="mt-2 text-sm opacity-70">You haven&apos;t submitted any prompts yet. Your prompt history will appear here.</p>
      </div>
    </div>
  ) : null
}


      {promptsHistoryList?.map((res, index) => (
        <div
          key={res._id}
          className="p-4 bg-white dark:bg-zinc-800 rounded-xl shadow-md border border-gray-300 dark:border-zinc-700 space-y-2 max-w-[700px] mx-auto "
        >
          <div className="flex justify-between items-center text-sm opacity-70">
            <span>#{index + 1}</span>
            <span>{res.model} • {formatDate(res.createdAt)}</span>
          </div>
          <Link href={'/'} ><p onClick={() => promptRequests(res._id , 'get') } className="text-base font-medium">{res.prompt}</p></Link>
          <div className="text-right">
            <button
              onClick={() => promptRequests(res._id,'del')}
              className="text-red-500 cursor-pointer  hover:underline"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
