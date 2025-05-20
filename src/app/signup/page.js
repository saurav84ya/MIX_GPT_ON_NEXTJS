'use client'

import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaTwitter } from "react-icons/fa";
import React, { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation";


export default function SignupPage() {
    const { data: session ,status } = useSession()
  console.log("session " ,session)

  const router = useRouter()

    useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session, router]);

  if (status === "loading") {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="border p-8 rounded-2xl shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6">Sign Up \ Log in</h1>

        {/* Google Button */}
        <button
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 hover:text-black cursor-pointer transition"
           onClick={() => signIn("google")}
        >
          <FcGoogle size={22} />
          <span className="text-sm font-medium">Continue with Google</span>
        </button>

        {/* Twitter Button */}
        <button
          className="w-full mt-4 flex items-center justify-center gap-3 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 cursor-pointer hover:text-black transition"
        >
          <FaTwitter size={22} className="text-blue-500" />
          <span className="text-sm font-medium">Continue with Twitter</span>
        </button>

        {/* GitHub Button */}
        <button
          className="w-full mt-4 flex items-center justify-center gap-3 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 cursor-pointer hover:text-black transition"
          onClick={() => signIn("github")}
        >
          <FaGithub size={22} className="text-black" />
          <span className="text-sm font-medium">Continue with GitHub</span>
        </button>
      </div>
    </div>
  );
}
