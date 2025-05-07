"use client"

import React from 'react'

export default function ResChatGpt({response}) {
  console.log("response",response)
  return (
    <div>
      {response}
    </div>
  )
}
