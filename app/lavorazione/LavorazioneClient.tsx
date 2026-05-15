"use client";

import { useState } from "react";
import { updateTaskStatus, updateTaskDetails, deleteTask } from "../actions";
import { 
  CheckCircle2, User, Trash2, Check, X, SearchX, 
  FileText, AlertCircle, Clock, Edit3, Save, 
  Car, Bike, Hash, ArrowRight 
} from "lucide-react";

export default function LavorazioneClient({ initialTasks }: { initialTasks: any[] }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempDesc, setTempDesc] = useState("");

  // Funzione per salvare la descrizione nel DB
  const saveEdit = async (id: string) => {
    await updateTaskDetails(id, tempDesc);
    setTasks(tasks.map(t => t.id === id ? { ...t, descrizione: tempDesc } : t));
    setEditingId(null);
  };

  // Funzione per spostare in consegna
  const handleMoveToDelivery = async (id: string) => {
    await updateTaskStatus(id, "In Consegna");
    setTasks(tasks.filter(t => t.id !== id)); // Rimuovi dalla vista lavorazione
  };

  // Funzione per eliminare
  const handleConfirmDelete = async (id: string) => {
    await deleteTask(id);
    setTasks(tasks.filter(t => t.id !== id));
    setDeletingId(null);
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] p-6 md:p-12 w-full max-w-[1800px] mx-auto font-sans text-left">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 border-l-4 border-blue-600 pl-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase italic">Controllo <span className="text-blue-600">Operativo</span></h2>
          <p className="text-slate-500 font-medium text-sm mt-1 uppercase tracking-widest opacity-70">Monitoraggio flotta in tempo reale</p>
        </div>
        <div className="bg-white px-6 py-3 rounded-lg shadow-sm border border-slate-200 flex items-center gap-3">
          <Clock className="text-blue-500" size={18} />
          <span className="text-xl font-black text-slate-800">{tasks.length}</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">In Officina</span>
        </div>
      </div>
      
      {tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 opacity-20">
          <SearchX size={48} className="mb-4" />
          <p className="font-black uppercase text-xs tracking-[0.3em]">Nessuna lavorazione attiva</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {tasks.map(task => (
            <div key={task.id} className={`group bg-white rounded-2xl border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-blue-200 overflow-hidden flex flex-col relative ${task.priorita === 'Alta' ? 'ring-1 ring-red-100' : ''}`}>
              
              {/* HEADER CARD */}
              <div className="p-6 bg-slate-50/50 border-b border-slate-100 relative">
                <div className="flex justify-between items-start">
                  <div className="space-y-1 text-left">
                    <div className="flex items-center gap-2">
                      {task.categoria === 'Moto' ? <Bike size={16} className="text-blue-500" /> : <Car size={16} className="text-blue-500" />}
                      <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tight">{task.modello}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-white border border-slate-200 px-2 py-0.5 rounded shadow-sm"><Hash size={10} /> {task.targa}</span>
                      {task.priorita === 'Alta' && <span className="bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded shadow-sm animate-pulse flex items-center gap-1"><AlertCircle size={10} /> CRITICO</span>}
                    </div>
                  </div>
                  <button onClick={() => setDeletingId(task.id)} className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 transition-all p-2 bg-white rounded-full shadow-sm border border-slate-100"><Trash2 size={16} /></button>
                </div>
              </div>

              {/* BODY */}
              <div className="p-6 space-y-6 flex-grow text-left">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-inner"><User size={20} /></div>
                  <div className="text-left">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Cliente</p>
                    <p className="text-md font-bold text-slate-800 uppercase tracking-tight">{task.cliente}</p>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 relative group/desc">
                  <div className="flex justify-between items-center mb-3">
                    <span className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]"><FileText size={12} className="text-blue-400" /> Dettagli Intervento</span>
                    {editingId !== task.id && <button onClick={() => { setEditingId(task.id); setTempDesc(task.descrizione); }} className="text-blue-500 hover:bg-blue-100 p-1.5 rounded-md transition-all"><Edit3 size={14} /></button>}
                  </div>
                  {editingId === task.id ? (
                    <div className="space-y-3">
                      <textarea value={tempDesc} onChange={(e) => setTempDesc(e.target.value)} className="w-full text-sm font-medium text-slate-700 bg-white border-2 border-blue-200 rounded-lg p-3 focus:outline-none focus:ring-4 focus:ring-blue-50 min-h-[120px]" autoFocus />
                      <div className="flex gap-2 justify-end">
                        <button onClick={() => saveEdit(task.id)} className="bg-blue-600 text-white text-[10px] font-black px-4 py-2 rounded-lg flex items-center gap-2"><Save size={12} /> SALVA</button>
                        <button onClick={() => setEditingId(null)} className="bg-white text-slate-400 text-[10px] font-black px-4 py-2 rounded-lg border border-slate-200">ANNULLA</button>
                      </div>
                    </div>
                  ) : (
                    <p onClick={() => { setEditingId(task.id); setTempDesc(task.descrizione); }} className="text-sm font-semibold text-slate-600 leading-relaxed italic cursor-pointer hover:text-slate-900">{task.descrizione || "Nessuna specifica..."}</p>
                  )}
                </div>
              </div>

              {/* FOOTER */}
              <div className="px-6 py-5 bg-white border-t border-slate-50 flex items-center justify-between">
                <div className="flex flex-col text-left">
                  <span className="text-[9px] font-black text-slate-300 uppercase mb-1">Stato</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${task.status === 'Verniciatura' ? 'bg-orange-500' : 'bg-blue-600'}`} />
                    <span className="text-xs font-black text-slate-800 uppercase italic">{task.status}</span>
                  </div>
                </div>

                <button onClick={() => handleMoveToDelivery(task.id)} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-[10px] font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 group/btn">
                  PRONTO <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* MODALE ELIMINA */}
              {deletingId === task.id && (
                <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-8 text-center animate-in zoom-in-95 rounded-2xl">
                  <AlertCircle className="text-red-500 mb-4" size={40} />
                  <h4 className="text-white font-black text-lg mb-2 uppercase tracking-tighter">Eliminare il lavoro?</h4>
                  <div className="flex gap-4 w-full mt-4">
                    <button onClick={() => handleConfirmDelete(task.id)} className="flex-1 bg-red-600 text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg">CONFERMA</button>
                    <button onClick={() => setDeletingId(null)} className="flex-1 bg-white/10 text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest border border-white/20">CHIUDI</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}