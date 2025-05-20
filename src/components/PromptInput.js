"use client";

import { Send, SendToBack } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner ";
import { useMyContext } from "@/context/MyContext";

export default function PromptInput() {

  const { prompt, setPrompt, response, setResponse, modelSelected, setSelectedModel, session } = useMyContext();
  const [loading, setLoading] = useState(false);

 const sendPrompt = async () => {
  if (!prompt.trim()) {
    toast.error("Please enter a prompt!");
    return;
  }

  const isAuthenticated = !!session;
  const userId = session?.user?._id;
  const apiRoute = isAuthenticated ? "/api/authPrompt" : "/api/unAuthPrompt";
  const payload = isAuthenticated
    ? { prompt, modelSelected, userId }
    : { prompt, modelSelected };

  setLoading(true);
  try {
    const res = await fetch(apiRoute, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.success) {
      setResponse((prev) => [...prev, data]);
      toast.success(`Response from ${data?.response?.model}`);
      setPrompt("");
    } else {
      toast.error("❌ " + data.message);
    }
  } catch (err) {
    toast.error("⚠️ Server error!");
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="rounded-xl border bg-[#212121] border-black md:p-4 p-2 mt-4 shadow-xl">
      <textarea
        className="bg-[#303030] md:w-[70vw] w-[90vw] lg:w-[700px] xl:w-[900px] rounded-xl border border-black h-[100px] md:p-4 p-2 text-white"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Type your prompt here..."
      />
      <div className="flex justify-between px-3 mt-3">
        <div>
          <button><SendToBack /></button>
          <button><SendToBack /></button>
        </div>
        {
          loading ? <LoadingSpinner /> : <button
            className="cursor-pointer"
            onClick={sendPrompt}
            disabled={loading}
          >
            <Send />
          </button>
        }
      </div>

    </div>
  );
}
