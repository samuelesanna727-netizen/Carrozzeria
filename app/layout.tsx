"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "./components/layout/Sidebar"; 
import Navbar from "./components/layout/Navbar";
import { TaskProvider } from "./context/TaskContext"; 
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // 1. Usa sessionStorage (come nel nuovo Login) e non localStorage
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");

    if (!isLoggedIn && pathname !== "/login") {
      setAuthorized(false);
      router.replace("/login");
    } else {
      setAuthorized(true);
    }
    setLoading(false);
  }, [pathname, router]);

  // Gestione speciale per la pagina di login
  if (pathname === "/login") {
    return (
      <html lang="it">
        <body className="bg-slate-50 text-slate-900 font-sans antialiased">
          {children}
        </body>
      </html>
    );
  }

  // Schermata di caricamento mentre verifichiamo la sessione
  if (loading || !authorized) {
    return (
      <html lang="it">
        <body className="bg-slate-50" />
      </html>
    );
  }

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