"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMyContext } from "@/context/MyContext";

export default function AccountPage() {
  const { session } = useMyContext();
  const router = useRouter();

  const user = session?.user;

  useEffect(()=>{
    if(!session){
        router.push("/")
    }
  },[session])

  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState(""); // 'account' or 'prompts'
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    let interval;
    if (showPopup && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showPopup, timer]);

  const openPopup = (type) => {
    setPopupType(type);
    setTimer(10);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupType("");
    setTimer(10);
  };

  const handleConfirm = async () => {
    try {
      const res = await fetch(
        `/api/deleteRequests?userId=${user?._id}&action=${popupType}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();

      if (data.success) {
        if (popupType === "account") {
          alert("✅ Account deleted successfully.");
          window.location.reload();
          ; // redirect to home
        } else {
          alert("✅ All prompts deleted successfully.");
          window.location.reload();
        }
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong.");
    } finally {
      closePopup();
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">👤 Account Overview</h1>
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          ⬅ Go Home
        </button>
      </div>

      <div className="shadow-md rounded-xl border border-white  p-5 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src={user?.image}
          alt="User Avatar"
          className="w-24 h-24 rounded-full border"
        />
        <div className="w-full">
          <h2 className="text-xl font-semibold">{user?.name}</h2>
          <p className="text-sm text-gray-600">{user?.email}</p>
          <p className="text-gray-600 break-words">ID: {user?._id}</p>
          {user?.joined && (
            <p className="text-sm text-gray-400 mt-1">
              Joined: <span className="font-medium">{user?.joined}</span>
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <button
          onClick={() => openPopup("prompts")}
          className="w-full py-2 rounded bg-yellow-500 text-black font-bold cursor-pointer hover:bg-yellow-600"
        >
          🧹 Delete All Prompts
        </button>
        <button
          onClick={() => openPopup("account")}
          className="w-full py-2 rounded bg-red-700 text-white hover:bg-red-800"
        >
          🗑️ Delete My Account
        </button>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className=" rounded-lg p-6 border border-white shadow-md w-[90%] max-w-md text-center space-y-4">
            <h2 className="text-lg font-semibold text-red-600">
              Are you sure you want to delete{" "}
              {popupType === "account" ? "your account" : "all prompts"}?
            </h2>
            <p className="text-sm text-gray-500">
              This action cannot be undone. Confirm after {timer} seconds.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={closePopup}
                className="px-4 py-2 bg-green-500 font-bold rounded hover:bg-green-700"
              >
                No
              </button>
              <button
                disabled={timer > 0}
                onClick={handleConfirm}
                className={`px-4 py-2 rounded text-white ${
                  timer > 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
   {/* Footer Section */}
      <div className="mt-12 border-t border-white pt-6 text-center space-y-3">
        <p className="text-sm text-gray-400">Thanks for using our platform 🥰</p>
        <p className="text-sm text-gray-500">Made with ❤️ by Saurav Chaurasia</p>
        <div className="flex justify-center gap-6 mt-2 text-lg">
          <a
            href="https://www.instagram.com/saurav_8.4ya/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-400 transition"
          >
            📷 Instagram
          </a>
          <a
            href="https://www.linkedin.com/in/saurav-chaurasia-1017192b8/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            💼 LinkedIn
          </a>
          <a
            href="https://github.com/saurav84ya"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition"
          >
            🧑‍💻 GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
