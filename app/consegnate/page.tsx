"use client";

import { useTasks } from "../context/TaskContext";
import { User, Trash2, Check, X, Calendar, ArrowLeft, History, SearchX } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function ConsegnatePage() {
  const { tasks, deleteTask, searchQuery } = useTasks();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const consegnatiFiltrati = tasks.filter((task) => {
    const searchLower = searchQuery.toLowerCase();
    const matchSearch =
      task.modello.toLowerCase().includes(searchLower) ||
      task.targa.toLowerCase().includes(searchLower) ||
      task.cliente.toLowerCase().includes(searchLower);

    return task.status === "Consegnato" && matchSearch;
  });

  return (
    <div className="p-8 w-full max-w-[1600px] mx-auto animate-in fade-in duration-500">
      
      {/* HEADER PULITO */}
      <div className="flex justify-between items-end mb-10 pb-6 border-b border-slate-100">
        <div>
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-green-600 transition-colors mb-4 text-xs font-bold uppercase tracking-widest">
            <ArrowLeft size={14} /> Dashboard
          </Link>
          <h2 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">
            Archivio <span className="text-green-600">Consegnati</span>
          </h2>
          <p className="text-slate-400 text-sm italic">Storico dei veicoli completati</p>
        </div>
        <div className="text-right">
          <div className="bg-green-50 text-green-700 px-5 py-2.5 rounded-xl border border-green-100 shadow-sm inline-block">
             <span className="text-xl font-black">{consegnatiFiltrati.length}</span>
             <span className="text-[10px] font-black uppercase ml-2 tracking-widest opacity-70">Totale</span>
          </div>
        </div>
      </div>

      {/* GRID A 3 COLONNE */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {consegnatiFiltrati.map((task) => (
          <div 
            key={task.id} 
            className="bg-white rounded-xl border border-slate-200 shadow-sm hover:border-green-300 transition-all flex flex-col group overflow-hidden"
          >
            {/* TOP CARD */}
            <div className="p-6 pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 uppercase leading-tight group-hover:text-green-600 transition-colors">
                    {task.modello}
                  </h3>
                  {/* TARGA: Ora in Grigio/Blu Soft invece del Nero */}
                  <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded mt-1.5 inline-block border border-slate-200">
                    {task.targa}
                  </span>
                </div>
                
                <div className="h-8">
                  {deletingId === task.id ? (
                    <div className="flex gap-1 animate-in zoom-in">
                      <button onClick={() => { deleteTask(task.id); setDeletingId(null); }} className="text-red-500 p-1.5 hover:bg-red-50 rounded-lg transition-colors"><Check size={18} /></button>
                      <button onClick={() => setDeletingId(null)} className="text-slate-300 p-1.5 hover:bg-slate-50 rounded-lg transition-colors"><X size={18} /></button>
                    </div>
                  ) : (
                    <button onClick={() => setDeletingId(task.id)} className="text-slate-200 hover:text-red-400 p-1.5 transition-all opacity-60 hover:opacity-100">
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* INFO CLIENTE E DATA */}
            <div className="px-6 py-5 bg-slate-50/40 flex flex-col gap-4 border-y border-slate-50">
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-lg border border-slate-100 shadow-sm text-slate-400">
                   <User size={14} />
                </div>
                <span className="text-sm font-bold text-slate-700 uppercase tracking-tight">{task.cliente}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-lg border border-slate-100 shadow-sm text-green-500">
                   <Calendar size={14} />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Consegnata il</span>
                  <span className="text-xs font-bold text-slate-600">{task.dataIngresso}</span> 
                </div>
              </div>
            </div>

            {/* FOOTER CARD */}
            <div className="p-4 bg-white mt-auto flex items-center justify-center">
              <div className="flex items-center gap-2 text-green-500/60 font-black text-[9px] uppercase tracking-[0.25em]">
                <History size={12} />
                Lavoro Concluso
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {consegnatiFiltrati.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 text-slate-300">
          <SearchX size={48} strokeWidth={1} className="mb-4 opacity-30" />
          <p className="text-sm font-bold uppercase tracking-[0.2em]">Nessuna corrispondenza</p>
          <p className="text-xs italic mt-1 text-slate-400">
            {searchQuery ? `Nessun risultato nell'archivio per "${searchQuery}"` : "L'archivio è attualmente vuoto"}
          </p>
        </div>
      )}
    </div>
  );
}