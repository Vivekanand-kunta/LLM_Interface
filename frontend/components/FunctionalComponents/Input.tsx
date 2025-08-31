"use client";
import React, { useRef } from "react";
import { Textarea } from "../ui/textarea";
import { filepost } from "../functions/upload";
import { Button } from "../ui/button";

const Input = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const textRef = useRef<HTMLTextAreaElement | null>(null);

  const handleFileChange = async () => {
    if (!inputRef.current?.files) return;

    const files = Array.from(inputRef.current.files);

    try {
      const res = await filepost(textRef.current?.value || "Vivek", files);
      console.log("Message:", res.msg);
      console.log("Result:", res.res);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div>
      <Textarea ref={textRef} placeholder="Type your Query here." onChange={(e)=>{console.log(textRef.current?.value )}}/>
      <input
        type="file"
        multiple
        ref={inputRef}
        className="hidden"
        onChange={handleFileChange}
      />
      <Button onClick={() => inputRef.current?.click()}>+</Button>
    </div>
  );
};

export default Input;
