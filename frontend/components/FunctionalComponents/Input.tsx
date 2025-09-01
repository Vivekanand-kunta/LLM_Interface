"use client";
import React, { useRef, useState, useContext } from "react";
import { Textarea } from "../ui/textarea";
import { filepost } from "../functions/upload";
import { Button } from "../ui/button";
import ChatContext from "../Context/ChatContext";

const Input = () => {
  const chatCtx = useContext(ChatContext);
  if (!chatCtx) return null;

  const { infering, setInfering, setChat } = chatCtx;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [tempChat, setTempChat] = useState<string>("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // Select files
  const handleFileSelect = () => {
    if (!inputRef.current?.files) return;
    const files = Array.from(inputRef.current.files);
    setSelectedFiles(files);
    inputRef.current.value = "";
  };

  // Step 2: send prompt + files
const handleSend = async () => {
  if (!tempChat && selectedFiles.length === 0)return;

  setInfering(true);
  // Step 1: Add user message
  setChat((prev) => [
    ...prev,
    {
      chat: tempChat,
      type: "user",
      files: selectedFiles.map((f) => f.name),
    },
  ]);
  setTempChat("");
  setSelectedFiles([]);

  try {
    const res = await filepost(tempChat, selectedFiles);
    setInfering(false);
    setChat(prev=>[...prev,
      {
      chat: res.res,
      type: "assistant",
      }
    ]);
  } catch (err) {
    alert(`Error: ${err} \n Occured in Backend`);
  }
};



  return (
    <div className="flex gap-2 w-[95vw] ml-[2.5vw] mt-2 bg-transparent">
     
      <Button
        className="my-auto h-10 rounded-full border border-white hover:border-2 m-2"
        onClick={() => inputRef.current?.click()}
      >
        <p className="relative bottom-0.5 text-2xl">+</p>
      </Button>

      <Textarea
        className="h-20 resize-none overflow-y-auto scrollbar-hide"
        value={tempChat}
        placeholder="Type your Query here."
        onChange={(e) => setTempChat(e.currentTarget.value)}
      />

      <input
        type="file"
        multiple
        ref={inputRef}
        className="hidden"
        onChange={handleFileSelect}
      />

      {selectedFiles.length > 0 && (
        <ul className="text-sm text-gray-500">
          {selectedFiles.map((f, i) => (
            <li key={i}>{f.name}</li>
          ))}
        </ul>
      )}

      <Button
        disabled={infering}
        className="my-auto h-10 rounded-full m-2"
        onClick={handleSend}
      >
        <p className="relative top-1 text-2xl">^</p>
      </Button>
    </div>
  );
};

export default Input;
