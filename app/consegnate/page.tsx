"use client";

import { useTasks } from "../context/TaskContext";
import { 
  User, Trash2, ArrowLeft, History, SearchX, 
  FileText, Hash, Car, Bike, Archive, ShieldCheck 
} from "lucide-react";
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
      task.cliente.toLowerCase().includes(searchLower) ||
      task.categoria.toLowerCase().includes(searchLower); // <-- Ricerca per Moto/Auto
    return task.status === "Consegnato" && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#F1F5F9] p-6 md:p-12 w-full max-w-[1800px] mx-auto font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 border-l-4 border-slate-400 pl-6">
        <div>
          <Link href="/lavorazione" className="flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-all text-[10px] font-black uppercase tracking-widest mb-2 group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Dashboard Attiva
          </Link>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase italic">Registro <span className="text-slate-400 font-light">Storico</span></h2>
          <p className="text-slate-500 font-medium text-sm mt-1 uppercase tracking-widest opacity-70 flex items-center gap-2"><ShieldCheck size={14} className="text-emerald-500" /> Documentazione protetta</p>
        </div>
        <div className="bg-white px-8 py-4 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <Archive className="text-slate-400" size={24} />
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Veicoli Consegnati</p>
            <p className="text-2xl font-black text-slate-800 leading-none">{consegnatiFiltrati.length}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {consegnatiFiltrati.map((task) => (
          <div key={task.id} className="group bg-white rounded-2xl border border-slate-200 shadow-sm transition-all duration-300 overflow-hidden flex flex-col relative">
            <div className="p-6 bg-slate-50 border-b border-slate-100 relative">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {task.categoria === 'Moto' ? <Bike size={16} className="text-slate-400" /> : <Car size={16} className="text-slate-400" />}
                    <h3 className="text-xl font-black text-slate-700 uppercase italic tracking-tight">{task.modello}</h3>
                  </div>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-white border border-slate-200 px-2 py-0.5 rounded shadow-sm w-fit"><Hash size={10} /> {task.targa}</span>
                </div>
                <button onClick={() => setDeletingId(task.id)} className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 transition-all p-2 bg-white rounded-full shadow-sm border border-slate-100"><Trash2 size={16} /></button>
              </div>
            </div>

            <div className="p-6 space-y-5 flex-grow">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-300"><User size={18} /></div>
                  <div>
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest leading-none mb-0.5">Proprietario</p>
                    <p className="text-sm font-bold text-slate-600 uppercase italic">{task.cliente}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-0.5">Data Chiusura</p>
                  <p className="text-sm font-bold text-slate-700">{task.dataIngresso}</p>
                </div>
              </div>

              <div className="bg-slate-50/50 rounded-xl p-5 border border-slate-100">
                <span className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest mb-3"><FileText size={12} /> Riepilogo Intervento</span>
                <p className="text-sm font-semibold text-slate-500 leading-relaxed italic">{task.descrizione || "Nessuna nota finale."}</p>
              </div>
            </div>

            <div className="px-6 py-4 bg-emerald-50/20 border-t border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-600/60 font-black text-[9px] uppercase tracking-[0.2em]"><History size={14} /> Operazione Conclusa</div>
              <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[8px] font-black uppercase">Archiviato</div>
            </div>

            {deletingId === task.id && (
              <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-8 text-center animate-in zoom-in-95">
                <Trash2 className="text-red-500 mb-4" size={40} />
                <h4 className="text-white font-black text-lg mb-2 uppercase italic">Rimuovere definitivamente?</h4>
                <div className="flex gap-4 w-full mt-4">
                  <button onClick={() => { deleteTask(task.id); setDeletingId(null); }} className="flex-1 bg-red-600 text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest">Conferma</button>
                  <button onClick={() => setDeletingId(null)} className="flex-1 bg-white/10 text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest border border-white/20">Annulla</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}