"use client";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function Home() {
  const { data } = useSession();
  console.log(data);
  const [Loading,setLoading]=useState(false)

  const handleSignOut=async()=>{
    setLoading(true)
    try {
      await signOut()
      setLoading(false)
      
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <div className="">
      <h1 className="text-2xl text-white text-center mt-2 bg-blue-600">
        {" "}
        Welcome to next js fullstack project!
      </h1>
      <h2 className=" text-2xl text-teal-400 uppercase">
        Author: Satya Prakash Prajapati
        <div className="absolute w-8 h-1 bg-blue-600  mx-40"></div>
      </h2>
      {/* <button className="p-2 bg-blue-600 mt-2 rounded  text-white">Click me</button> */}

      <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white px-4">
        {data && (
          <div
            className="max-w-md w-full  border-2 border-white rounded-2xl p-8 shadow-lg text-center
        relative flex flex-col items-center"
          >
            {data.user.image && 
              <div className="relative w-[100px] h-[100px] rounded-full border-2 border-white overflow-hidden">
                <Image src={data.user.image} fill alt="User Img" />
              </div>
            }
            <h1 className="text-2xl font-semibold my-4">Welcome ,{data.user.name}</h1>
            <button className="w-full py-2 px-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200
            transition-colors" onClick={handleSignOut}>Sign Out</button>
          </div>
        )}
        {!data && <div className="text-white text-2xl">Loading...</div>}
      </div>
    </div>
  );
}
