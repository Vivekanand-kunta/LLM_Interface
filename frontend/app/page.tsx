'use client'
import Input from "@/components/FunctionalComponents/Input";
import { useContext } from "react";
import ChatContext from "@/components/Context/ChatContext";
import ChatElement from "@/components/FunctionalComponents/ChatElement";
export default function Home() {

  const {infering}=useContext(ChatContext);

  return (
    <div >
      <h1 className="text-center text-5xl font-extrabold font-sans tracking-wide text-gray-800 drop-shadow-md">INTERFACE</h1>
      <div className="glass-card w-[95vw] h-[82.0vh] mx-auto mt-2.5 overflow-y-auto
       rounded-2xl  hide-scrollbar border-1 border-black">
      
      <ChatElement></ChatElement>
      { infering &&
      <div className="self-start max-w-[60%] text-black border border-black rounded-lg m-2">
        <div className="flex h-20 w-[100%] items-center justify-center bg-white/60 rounded-2xl">
        <div className="h-16 w-16 rounded-full border-4 border-gray-300 border-t-transparent animate-spin" />
      </div>
      </div>
      }
      </div>
      <Input/>
    </div>
  );
}
