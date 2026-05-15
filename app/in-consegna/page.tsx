"use client";

import { useTasks } from "../context/TaskContext";
import { 
  RotateCcw, CheckCircle2, User, FileText, Trash2, Edit3, Save, X, AlertCircle,
  Clock, Car, Bike, Hash, ArrowLeft, ChevronRight 
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function InConsegnaPage() {
  const { tasks, updateTask, updateTaskDetails, deleteTask, searchQuery } = useTasks();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempDesc, setTempDesc] = useState("");

  const inConsegna = tasks.filter((task) => {
    const searchLower = searchQuery.toLowerCase();
    return task.status === "In Consegna" && 
      (task.modello.toLowerCase().includes(searchLower) || task.targa.toLowerCase().includes(searchLower) || task.cliente.toLowerCase().includes(searchLower));
  });

  const saveEdit = (id: string) => {
    updateTaskDetails(id, { descrizione: tempDesc });
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] p-6 md:p-12 w-full max-w-[1800px] mx-auto font-sans text-left">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 border-l-4 border-orange-500 pl-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/lavorazione" className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-orange-500 transition-colors flex items-center gap-1">
              <ArrowLeft size={12} /> Officina
            </Link>
            <ChevronRight size={10} className="text-slate-300" />
            <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Logistica</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase italic">Area <span className="text-orange-500">In Consegna</span></h2>
          <p className="text-slate-500 font-medium text-sm mt-1 uppercase tracking-widest opacity-70">Veicoli pronti per il ritiro cliente</p>
        </div>
        <div className="bg-white px-6 py-3 rounded-lg shadow-sm border border-slate-200 flex items-center gap-3">
          <Clock className="text-orange-500" size={18} />
          <span className="text-xl font-black text-slate-800">{inConsegna.length}</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Pronti</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {inConsegna.map(task => (
          <div key={task.id} className="group bg-white rounded-2xl border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-orange-200 overflow-hidden flex flex-col relative">
            
            <div className="p-6 bg-slate-50/50 border-b border-slate-100">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {task.categoria === 'Moto' ? <Bike size={16} className="text-orange-500" /> : <Car size={16} className="text-orange-500" />}
                    <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tight">{task.modello}</h3>
                  </div>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-white border border-slate-200 px-2 py-0.5 rounded shadow-sm w-fit"><Hash size={10} /> {task.targa}</span>
                </div>
                <button onClick={() => setDeletingId(task.id)} className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 transition-all p-2 bg-white rounded-full shadow-sm border border-slate-100"><Trash2 size={16} /></button>
              </div>
            </div>

            <div className="p-6 space-y-6 flex-grow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 shadow-inner"><User size={20} /></div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Proprietario</p>
                  <p className="text-md font-bold text-slate-800 uppercase tracking-tight">{task.cliente}</p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 relative group/desc">
                <div className="flex justify-between items-center mb-3">
                  <span className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]"><FileText size={12} className="text-orange-400" /> Riepilogo Intervento</span>
                  {editingId !== task.id && <button onClick={() => { setEditingId(task.id); setTempDesc(task.descrizione); }} className="text-orange-500 hover:bg-orange-100 p-1.5 rounded-md transition-all"><Edit3 size={14} /></button>}
                </div>
                {editingId === task.id ? (
                  <div className="space-y-3">
                    <textarea value={tempDesc} onChange={(e) => setTempDesc(e.target.value)} className="w-full text-sm font-medium text-slate-700 bg-white border-2 border-orange-200 rounded-lg p-3 focus:outline-none focus:ring-4 focus:ring-orange-50 min-h-[100px]" autoFocus />
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => saveEdit(task.id)} className="bg-orange-600 text-white text-[10px] font-black px-4 py-2 rounded-lg flex items-center gap-2"><Save size={12} /> SALVA</button>
                      <button onClick={() => setEditingId(null)} className="bg-white text-slate-400 text-[10px] font-black px-4 py-2 rounded-lg border border-slate-200">ANNULLA</button>
                    </div>
                  </div>
                ) : (
                  <p onClick={() => { setEditingId(task.id); setTempDesc(task.descrizione); }} className="text-sm font-semibold text-slate-600 leading-relaxed italic cursor-pointer hover:text-slate-900">{task.descrizione || "Nessuna specifica..."}</p>
                )}
              </div>
            </div>

            <div className="p-4 bg-white border-t border-slate-50 grid grid-cols-2 gap-3">
              <button onClick={() => updateTask(task.id, 'In Corso')} className="flex items-center justify-center gap-2 py-4 rounded-xl border-2 border-slate-100 text-slate-400 hover:text-blue-600 hover:border-blue-100 hover:bg-blue-50 transition-all font-black text-[10px] uppercase tracking-widest">
                <RotateCcw size={14} /> Ripristina
              </button>
              <button onClick={() => updateTask(task.id, 'Consegnato')} className="flex items-center justify-center gap-2 py-4 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all font-black text-[10px] uppercase tracking-widest">
                <CheckCircle2 size={14} /> Consegna
              </button>
            </div>

            {/* MODALE ELIMINA */}
            {deletingId === task.id && (
              <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-8 text-center animate-in zoom-in-95">
                <AlertCircle className="text-red-500 mb-4" size={40} />
                <h4 className="text-white font-black text-lg mb-2 uppercase tracking-tighter">Eliminare la pratica?</h4>
                <div className="flex gap-4 w-full mt-4">
                  <button onClick={() => { deleteTask(task.id); setDeletingId(null); }} className="flex-1 bg-red-600 text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg">ELIMINA</button>
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