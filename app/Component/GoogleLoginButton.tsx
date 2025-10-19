"use client";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/firebase/config";
import Image from "next/image";

export default function GoogleLoginButton() {
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex flex-row items-center justify-center px-6 py-2 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-gray-100 transition">
      <Image
        width={20}
        height={20}
        src="/GoogleIcon.png"
        alt="Google Logo"
        className="w-5 h-5 inline-block mr-2"
      />
      <button onClick={handleLogin}>Continue with Google</button>
    </div>
  );
}
