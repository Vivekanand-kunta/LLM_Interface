'use client'
import React, { useContext } from 'react'
import ChatContext from '../Context/ChatContext'

const ChatElement = () => {
  const chatCtx = useContext(ChatContext);
  if (!chatCtx) return null;

  const { Chat } = chatCtx;

  return (
    <div className="flex flex-col gap-2 w-full">
    { Chat.map((chat, index) => {
        if (chat.type === "user") {
            return (
            <div key={index} className="self-end max-w-[60%] bg-black text-white border border-white rounded-lg px-3 py-2 my-2 mr-4">
                <p>{chat.chat}</p>
                {chat.files && chat.files.length > 0 && (
                <ul className="mt-1 text-sm text-gray-300 list-disc list-inside">
                    {chat.files.map((file, i) => (
                    <li key={i}>{file}</li>
                ))}
                </ul>
                )}
            </div>);
            }

        if (chat.type === "assistant") {
            return (
            <div key={index} className="self-start max-w-[60%] bg-gray-100 text-black border border-black rounded-lg px-3 py-2 my-2 ml-4">
                <p>{chat.chat}</p>
            </div>);
            }
        return null;})
    }

    </div>
  )
}

export default ChatElement;
