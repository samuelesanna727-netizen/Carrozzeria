"use client";

import { Bell, Search, UserCircle, X } from "lucide-react";
// 1. Controlla che l'import sia questo (visto che sei in components/layout/)
import { useTasks } from "@/app/context/TaskContext"; 

export default function Navbar() {
  // 2. DEVI AGGIUNGERE QUESTA RIGA QUI SOTTO
  // Qui "estrai" quello che ti serve dal magazzino dati (Context)
  const { searchQuery, setSearchQuery } = useTasks();

  return (
    <nav className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 flex items-center justify-between px-8">
      
      {/* Search Bar */}
      <div className="hidden md:flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-xl border border-transparent focus-within:border-blue-400 focus-within:bg-white transition-all w-96">
        <Search size={18} className="text-slate-400" />
        <input 
          type="text" 
          // 3. Collega il valore e la funzione
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cerca targa o cliente..." 
          className="bg-transparent outline-none text-sm font-medium w-full"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery("")}>
            <X size={16} className="text-slate-400 hover:text-red-500" />
          </button>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-5">
        {/* ... resto del codice (Live, Bell, ecc.) ... */}
        
        <div className="flex items-center gap-2 cursor-pointer group">
          <UserCircle size={24} className="text-slate-400" />
          {/* Qui il nome è fisso, ma ora la Navbar sa chi sei perché è connessa */}
          <span className="text-xs font-bold text-slate-600">Samuele Officina</span>
        </div>
      </div>
    </nav>
  );
}