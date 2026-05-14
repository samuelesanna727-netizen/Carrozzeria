"use client";

import { Users, Search, Plus } from "lucide-react";

export default function ClientiPage() {
  return (
    <div className="p-10">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-black text-slate-900 uppercase italic">
            Anagrafica <span className="text-blue-600 not-italic">Clienti</span>
          </h2>
          <p className="text-slate-500 font-medium">Gestisci i contatti e lo storico dei tuoi clienti.</p>
        </div>
        
        <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
          <Plus size={20} />
          Nuovo Cliente
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3 bg-white border border-slate-200 px-4 py-2 rounded-xl w-96">
            <Search size={18} className="text-slate-400" />
            <input type="text" placeholder="Cerca per nome o telefono..." className="outline-none text-sm w-full" />
          </div>
        </div>
        
        <div className="p-20 text-center">
          <Users size={48} className="mx-auto text-slate-200 mb-4" />
          <p className="text-slate-400 font-bold italic">La lista clienti è ancora vuota.</p>
        </div>
      </div>
    </div>
  );
}