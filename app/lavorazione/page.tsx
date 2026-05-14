"use client";

import { useTasks } from "../context/TaskContext";
import { Wrench, CheckCircle2, User, Trash2, Check, X } from "lucide-react";
import { useState } from "react";

export default function LavorazionePage() {
  const { tasks, updateTask, deleteTask } = useTasks();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deliveringId, setDeliveringId] = useState<string | null>(null);

  const lavoriAttivi = tasks.filter(t => t.status !== 'Consegnato');

  return (
    <div className="p-10 max-w-7xl mx-auto">
      {/* ... Header invariato ... */}
            <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter">
            Auto <span className="text-blue-600 not-italic">In Lavorazione</span>
          </h2>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em] mt-2">
            Gestione flussi officina
          </p>
        </div>
        <div className="bg-blue-50 px-6 py-3 rounded-2xl border border-blue-100">
           <span className="text-blue-600 font-black text-xl">{lavoriAttivi.length}</span>
           <span className="ml-2 text-blue-400 font-bold uppercase text-[10px] tracking-widest">Mezzi attivi</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {lavoriAttivi.map(task => (
          <div key={task.id} className="bg-white p-2 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all group relative overflow-hidden">
            
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center gap-5">
                <div className="bg-slate-900 text-white px-4 py-2 rounded-xl shadow-lg border-b-4 border-blue-600">
                  <p className="text-[14px] font-black tracking-tighter uppercase">{task.targa}</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">{task.modello}</h3>
                  <div className="flex items-center gap-2 text-slate-400 mt-1">
                    <User size={14} />
                    <p className="text-sm font-bold italic uppercase">{task.cliente}</p>
                  </div>
                </div>
              </div>

              {/* AREA STATO + ELIMINA (Sistemata per non sovrapporsi) */}
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Stato attuale</p>
                  <span className="px-3 py-1 bg-amber-50 text-amber-600 border border-amber-100 rounded-lg text-[10px] font-black uppercase">
                    {task.status}
                  </span>
                </div>

                {/* Eliminazione Integrata nel flusso, non absolute */}
                <div className="flex items-center gap-1 min-w-[40px] justify-end">
                  {deletingId === task.id ? (
                    <div className="flex gap-1 animate-in fade-in zoom-in duration-200">
                      <button 
                        onClick={() => { deleteTask(task.id); setDeletingId(null); }}
                        className="p-2 bg-red-600 text-white rounded-xl shadow-md hover:bg-red-700"
                      >
                        <Check size={16} />
                      </button>
                      <button 
                        onClick={() => setDeletingId(null)}
                        className="p-2 bg-slate-100 text-slate-400 rounded-xl hover:bg-slate-200"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setDeletingId(task.id)}
                      className="p-2 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Azione di Consegna (Versione Slim) */}
            <div className="bg-slate-50 rounded-[1.8rem] p-4 flex items-center justify-between border-t border-slate-100">
              <div className="flex items-center gap-2 ml-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-tight">
                   {deliveringId === task.id ? "Confermare consegna?" : "In lavorazione..."}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {deliveringId === task.id ? (
                  <div className="flex gap-1 animate-in slide-in-from-right-2">
                    <button 
                      onClick={() => { updateTask(task.id, 'Consegnato'); setDeliveringId(null); }}
                      className="bg-green-600 text-white px-4 py-2 rounded-xl font-black text-[10px] uppercase flex items-center gap-2 shadow-md"
                    >
                      <Check size={14} /> SI
                    </button>
                    <button 
                      onClick={() => setDeliveringId(null)}
                      className="bg-slate-200 text-slate-500 px-4 py-2 rounded-xl font-black text-[10px] uppercase"
                    >
                      NO
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setDeliveringId(task.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 transition-all active:scale-95 shadow-sm"
                  >
                    <CheckCircle2 size={16} />
                    Consegna
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}