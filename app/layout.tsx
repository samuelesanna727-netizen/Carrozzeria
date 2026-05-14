"use client";

import { useState } from "react";
import Sidebar from "./components/layout/Sidebar"; 
import Navbar from "./components/layout/Navbar";
import { TaskProvider } from "./context/TaskContext"; 
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <html lang="it">
      <body className="bg-slate-50 text-slate-900 font-sans antialiased overflow-hidden">
        <TaskProvider>
          <div className="flex h-screen w-full">
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
            
            <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
              <Navbar />
              <main className="flex-1 overflow-y-auto bg-slate-50/50">
                {children}
              </main>
            </div>
          </div>
        </TaskProvider>
      </body>
    </html>
  );
}