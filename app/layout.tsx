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
    // 1. Controlla se l'utente ha la sessione attiva
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn && pathname !== "/login") {
      // Se non è loggato e non è già sulla pagina login, lo spedisce lì
      setAuthorized(false);
      router.replace("/login");
    } else {
      setAuthorized(true);
    }
    setLoading(false);
  }, [pathname, router]);

  // Se siamo nella pagina di login, mostriamo solo il contenuto (il form) 
  // senza Sidebar, Navbar o TaskProvider per evitare errori e sovrapposizioni.
  if (pathname === "/login") {
    return (
      <html lang="it">
        <body className="bg-slate-50 text-slate-900 font-sans antialiased">
          {children}
        </body>
      </html>
    );
  }

  // Mentre il sistema decide se farti entrare o mandarti al login, mostriamo una pagina vuota
  if (loading || !authorized) {
    return (
      <html lang="it">
        <body className="bg-slate-50" />
      </html>
    );
  }

  // Se l'utente è autorizzato e non è sulla pagina login, mostriamo l'App completa
  return (
    <html lang="it">
      <body className="bg-slate-50 text-slate-900 font-sans antialiased overflow-hidden">
        <TaskProvider>
          <div className="flex h-screen w-full">
            {/* Qui la Sidebar appare SOLO se sei loggato */}
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