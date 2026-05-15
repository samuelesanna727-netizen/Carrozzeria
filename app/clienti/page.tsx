"use client";

import { Users, Search, Plus, Phone, Car, ChevronRight } from "lucide-react";

export default function ClientiPage() {
  // In futuro, questo array arriverà da un database (es. Supabase o MongoDB)
  const clientiEsempio = [
    { id: 1, nome: "Mario Rossi", telefono: "333 1234567", auto: "Fiat Panda", targa: "AA123BB" },
    { id: 2, nome: "Luigi Bianchi", telefono: "347 7654321", auto: "Audi A3", targa: "CC456DD" },
    { id: 3, nome: "Giulia Verdi", telefono: "320 1122334", auto: "Jeep Renegade", targa: "EE789FF" },
  ];

  return (
    <div className="p-8 w-full max-w-[1600px] mx-auto animate-in fade-in duration-500">
      
      {/* HEADER SEMPLICE */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4 border-b border-slate-100 pb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">
            Anagrafica <span className="text-blue-600">Clienti</span>
          </h2>
          <p className="text-slate-400 text-sm italic">Gestione contatti e storico riparazioni</p>
        </div>
        
        <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
          <Plus size={18} />
          NUOVO CLIENTE
        </button>
      </div>


      {/* GRID CLIENTI (3 COLONNE) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clientiEsempio.length > 0 ? (
          clientiEsempio.map((cliente) => (
            <div key={cliente.id} className="bg-white border border-slate-200 rounded-xl p-6 hover:border-blue-300 transition-all group cursor-pointer shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-slate-50 p-3 rounded-full text-slate-400 group-hover:text-blue-600 transition-colors">
                  <Users size={20} />
                </div>
                <ChevronRight size={18} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 uppercase leading-tight mb-1">{cliente.nome}</h3>
              
              <div className="space-y-2 mt-4 pt-4 border-t border-slate-50">
                <div className="flex items-center gap-2 text-slate-500">
                  <Phone size={14} className="text-blue-500" />
                  <span className="text-sm font-medium">{cliente.telefono}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <Car size={14} />
                  <span className="text-xs font-bold text-slate-400 uppercase">{cliente.auto} — {cliente.targa}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <Users size={40} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-400 font-bold italic text-sm">Nessun cliente trovato.</p>
          </div>
        )}
      </div>
    </div>
  );
}