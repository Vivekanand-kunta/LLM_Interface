'use client'
import { createContext, useState } from "react";

interface Chat {
    chat: string;
    type: string;
    files?: string[]; 
  }
  
interface ChatContextType {
  Chat: Chat[];
  setChat: React.Dispatch<React.SetStateAction<Chat[]>>;
  infering: boolean;
  setInfering: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatContext = createContext<ChatContextType | null>(null);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [Chat, setChat] = useState<Chat[]>([]);
  const [infering, setInfering] = useState<boolean>(false);

  return (
    <ChatContext.Provider value={{ Chat, setChat, infering, setInfering }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;
