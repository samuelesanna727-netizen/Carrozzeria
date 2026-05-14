"use client";

import { useTasks } from "../context/TaskContext";
import { CheckCircle2, User, Trash2, Check, X, SearchX } from "lucide-react";
import { useState } from "react";

export default function LavorazionePage() {
  // 1. Estraiamo searchQuery dal contesto per far funzionare la ricerca della Navbar
  const { tasks, updateTask, deleteTask, searchQuery } = useTasks();
  
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deliveringId, setDeliveringId] = useState<string | null>(null);

  // 2. Filtriamo i task in base allo stato (non consegnati) E alla ricerca della Navbar
  const lavoriFiltrati = tasks.filter((task) => {
    const searchLower = searchQuery.toLowerCase();
    const matchSearch =
      task.modello.toLowerCase().includes(searchLower) ||
      task.targa.toLowerCase().includes(searchLower) ||
      task.cliente.toLowerCase().includes(searchLower);

    return task.status !== "Consegnato" && matchSearch;
  });

  return (
    <div className="p-8 w-full max-w-[1600px] mx-auto animate-in fade-in duration-500">
      
      {/* HEADER SEMPLICE E DISCRETO */}
      <div className="flex justify-between items-end mb-10 pb-6 border-b border-slate-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">
            Auto in lavorazione
          </h2>
          <p className="text-slate-400 text-sm italic">
            {searchQuery 
              ? `Risultati per: "${searchQuery}"` 
              : "Gestione flotta attiva"}
          </p>
        </div>
        <div className="text-right text-slate-500 font-bold text-sm uppercase tracking-widest">
          {lavoriFiltrati.length} {lavoriFiltrati.length === 1 ? 'Mezzo' : 'Mezzi'} in lista
        </div>
      </div>
      
      {/* GRID A 3 COLONNE */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lavoriFiltrati.map(task => (
          <div 
            key={task.id} 
            className={`bg-white rounded-xl border-2 transition-all duration-300 flex flex-col shadow-sm overflow-hidden ${
              deliveringId === task.id ? 'border-green-500 shadow-green-50' : 'border-slate-200'
            }`}
          >
            
            {/* PARTE ALTA: MODELLO E TARGA */}
            <div className="p-6 pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 uppercase leading-tight">{task.modello}</h3>
                  <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded mt-1 inline-block border border-blue-100">
                    {task.targa}
                  </span>
                </div>
                
                <div className="h-8">
                  {deletingId === task.id ? (
                    <div className="flex gap-1 animate-in zoom-in">
                      <button onClick={() => { deleteTask(task.id); setDeletingId(null); }} className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors"><Check size={18} /></button>
                      <button onClick={() => setDeletingId(null)} className="text-slate-300 hover:bg-slate-50 p-1.5 rounded-lg transition-colors"><X size={18} /></button>
                    </div>
                  ) : (
                    <button onClick={() => setDeletingId(task.id)} className="text-slate-200 hover:text-red-400 p-1.5 transition-all opacity-40 hover:opacity-100">
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* PARTE CENTRALE: CLIENTE E STATO */}
            <div className={`px-6 py-4 flex flex-col gap-3 transition-colors ${
              deliveringId === task.id ? 'bg-green-50/30' : 'bg-slate-50/50'
            }`}>
              <div className="flex items-center gap-2 text-slate-600">
                <User size={14} className="text-slate-400" />
                <span className="text-sm font-semibold uppercase tracking-tight">{task.cliente}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${deliveringId === task.id ? 'bg-green-500 animate-pulse' : 'bg-blue-500'}`} />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{task.status}</span>
              </div>
            </div>

            {/* PARTE BASSA: AZIONE CONSEGNA */}
            <div className="p-6 mt-auto">
              {deliveringId === task.id ? (
                <div className="flex items-center justify-between animate-in slide-in-from-bottom-1">
                  <p className="text-[10px] font-black text-green-600 uppercase tracking-widest">Confermi?</p>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => { updateTask(task.id, 'Consegnato'); setDeliveringId(null); }}
                      className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors shadow-lg shadow-green-200"
                    >
                      <Check size={18} />
                    </button>
                    <button 
                      onClick={() => setDeliveringId(null)} 
                      className="bg-slate-100 text-slate-400 p-2 rounded-lg hover:bg-slate-200 transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => setDeliveringId(task.id)}
                  className="w-full border border-slate-200 hover:border-green-600 hover:text-green-600 text-slate-500 py-2.5 rounded-lg font-bold uppercase text-[10px] tracking-widest transition-all flex items-center justify-center gap-2 bg-white hover:bg-green-50/20"
                >
                  <CheckCircle2 size={14} />
                  Segna Consegna
                </button>
              )}
            </div>

            {/* URGENZA (LINEA ROSSA IN BASSO) */}
            {task.priorita === 'Alta' && deliveringId !== task.id && (
              <div className="h-1 w-full bg-red-500" />
            )}
          </div>
        ))}
      </div>

      {/* STATO VUOTO (Se la ricerca non produce risultati) */}
      {lavoriFiltrati.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 text-slate-300">
          <SearchX size={48} strokeWidth={1} className="mb-4" />
          <p className="text-sm font-bold uppercase tracking-[0.2em]">Nessun mezzo trovato</p>
          <p className="text-xs italic mt-1 text-slate-400">Prova a cambiare i termini della ricerca</p>
        </div>
      )}
    </div>
  );
}