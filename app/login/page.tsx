"use client";
import axios from "axios";
import { ListChecks } from "lucide";
// import { List } from 'lucide-react';

import { FcGoogle } from "react-icons/fc";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

//http://localhost:3000/login
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter(); //next-nevigation wala router

  //After singin strore data session inside
  const session = useSession();
  console.log(" session data =", session.data?.user);
  //   console.log(session.data?.user);

  const handleSingIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        email,
        password,
      });
      console.log(result);
      toast.success("User logged in successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-md border-2 border-white rounded-2xl p-8 shadow-lg bg-gray-900 ">
        <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
        <form className="space-y-6" onSubmit={handleSingIn}>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="text"
              placeholder="Enter email"
              className="w-full bg-gray-900 border-b border-white py-2 px-1 text-white
               placeholder-gray-400 outline-none"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full bg-gray-900 border-b border-white py-2 px-1 text-white
               placeholder-gray-400 outline-none"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <p
            className="text-sm text-center mt-1"
            onClick={() => router.push("/register")}
          >
            Want to Create an account ?
            <span className="text-blue-400 hover:underline cursor-pointer">
              Register
            </span>
          </p>
          <button className="w-full py-2 px-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors">
            Login
          </button>
        </form>
        <div className="flex items-center justify-center gap-[5px] my-2">
          <hr className="grow border-gray-500" />
          <span>OR</span>

          <hr className="grow border-gray-500" />
        </div>
        <button
          className="w-full flex items-center justify-center gap-2 py-2 px-2 border
         border-gray-500 rounded-lg bg-white text-black hover:bg-gray-100 transition-colors"
        >
          <FcGoogle />
          <span>Sign in With Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
