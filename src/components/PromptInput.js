"use client";

import { Send, SendToBack } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner ";
import { useMyContext } from "@/context/MyContext";

export default function PromptInput() {

    const {  prompt, setPrompt ,response, setResponse ,modelSelected , setSelectedModel } = useMyContext();
  const [loading, setLoading] = useState(false);

  const sendPrompt = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt ,modelSelected }),
      });

      const data = await res.json();
      if (data.success) {
        setResponse(data);
        toast.success(`response from ${data?.model}`);
        setPrompt("")
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
    <div className="rounded-xl border border-black md:p-4 p-2 mt-4 shadow-xl">
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

      {/* {loading ? (
        <p className="mt-4 text-yellow-400">⌛ Thinking...</p>
      ) : response ? (
        <div className="mt-4 bg-[#222] text-white p-4 rounded-xl">
          <strong>AI:</strong> {response}
        </div>
      ) : null} */}
    </div>
  );
}
