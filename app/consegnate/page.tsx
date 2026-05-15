"use client";

import { useTasks } from "../context/TaskContext";
import { 
  Archive, User, FileText, Calendar, Trash2, AlertCircle,
  Car, Bike, Hash, CheckCircle2, SearchX 
} from "lucide-react";
import { useState } from "react";

export default function ConsegnatiPage() {
  const { tasks, deleteTask, searchQuery } = useTasks();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const consegnati = tasks.filter((task) => {
    const searchLower = searchQuery.toLowerCase();
    return task.status === "Consegnato" && 
      (task.modello.toLowerCase().includes(searchLower) || task.targa.toLowerCase().includes(searchLower) || task.cliente.toLowerCase().includes(searchLower));
  });

  return (
    <div className="min-h-screen bg-[#F1F5F9] p-6 md:p-12 w-full max-w-[1800px] mx-auto font-sans text-left">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 border-l-4 border-slate-800 pl-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase italic">Archivio <span className="text-slate-400">Storico</span></h2>
          <p className="text-slate-500 font-medium text-sm mt-1 uppercase tracking-widest opacity-70">Registro definitivo interventi chiusi</p>
        </div>
        <div className="bg-white px-6 py-3 rounded-lg shadow-sm border border-slate-200 flex items-center gap-3 text-slate-400">
          <Archive size={18} />
          <span className="text-xl font-black text-slate-800">{consegnati.length}</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Archiviati</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {consegnati.map(task => (
          <div key={task.id} className="group bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col relative opacity-90 hover:opacity-100 transition-all">
            
            <div className="p-6 bg-slate-50/50 border-b border-slate-100">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {task.categoria === 'Moto' ? <Bike size={16} className="text-slate-400" /> : <Car size={16} className="text-slate-400" />}
                    <h3 className="text-xl font-black text-slate-800 uppercase italic tracking-tight">{task.modello}</h3>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 font-mono tracking-tighter uppercase">{task.targa}</span>
                </div>
                {/* Tasto Elimina dall'Archivio */}
                <button onClick={() => setDeletingId(task.id)} className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 transition-all p-2 bg-white rounded-full shadow-sm border border-slate-100">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6 flex-grow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shadow-inner"><User size={20} /></div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Ex Proprietario</p>
                  <p className="text-md font-bold text-slate-700 uppercase tracking-tight">{task.cliente}</p>
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 opacity-60">
                <span className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3"><FileText size={12} /> Storico Lavori</span>
                <p className="text-sm font-semibold text-slate-500 leading-relaxed italic">{task.descrizione}</p>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50/30 border-t border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-400">
                <Calendar size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">Consegna: {task.dataIngresso}</span>
              </div>
              <div className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md text-[8px] font-black uppercase border border-emerald-100">Completato</div>
            </div>

            {/* MODALE ELIMINA ARCHIVIO */}
            {deletingId === task.id && (
              <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-8 text-center animate-in zoom-in-95">
                <AlertCircle className="text-red-500 mb-4" size={40} />
                <h4 className="text-white font-black text-lg mb-2 uppercase tracking-tighter">Eliminare definitivamente?</h4>
                <div className="flex gap-4 w-full mt-4">
                  <button onClick={() => { deleteTask(task.id); setDeletingId(null); }} className="flex-1 bg-red-600 text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest">ELIMINA</button>
                  <button onClick={() => setDeletingId(null)} className="flex-1 bg-white/10 text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest border border-white/20">ANNULLA</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}