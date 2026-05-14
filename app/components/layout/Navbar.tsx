"use client";

import { Bell, Search, UserCircle } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 flex items-center justify-between px-8">
      {/* Search Bar Minimal */}
      <div className="hidden md:flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-xl border border-transparent focus-within:border-blue-200 focus-within:bg-white transition-all w-96">
        <Search size={18} className="text-slate-400" />
        <input 
          type="text" 
          placeholder="Cerca targa o cliente..." 
          className="bg-transparent outline-none text-sm font-medium w-full"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-[10px] font-black text-green-700 uppercase tracking-widest">Live</span>
        </div>
        
        <button className="text-slate-400 hover:text-blue-600 transition-colors relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="w-px h-6 bg-slate-200 mx-2"></div>
        
        <div className="flex items-center gap-2 cursor-pointer group">
          <UserCircle size={24} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
          <span className="text-xs font-bold text-slate-600">Samuele Officina</span>
        </div>
      </div>
    </nav>
  );
}