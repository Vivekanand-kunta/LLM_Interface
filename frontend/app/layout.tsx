import type { Metadata } from "next";
import "./globals.css";
import {ChatProvider} from '@/components/Context/ChatContext'

export const metadata: Metadata = {
  title: "Interface",
  description: "Interface for video and image inputing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body>
        <ChatProvider>
        {children}
        </ChatProvider>
      </body>
    </html>
  );
}
