"use client";

import { useTasks } from "../context/TaskContext";
import { ArrowLeft, Trash2, Calendar, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ConsegnatiPage() {
  const { tasks, deleteTask } = useTasks();
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const consegnati = tasks.filter((t) => t.status === "Consegnato");

  const handleDeleteRequest = (id: string) => {
    if (confirmDelete === id) {
      deleteTask(id);
      setConfirmDelete(null);
    } else {
      setConfirmDelete(id);
      // Reset automatico dopo 2 secondi se non conferma
      setTimeout(() => setConfirmDelete(null), 2500);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-10">
        <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors font-bold uppercase text-[10px] tracking-widest mb-2">
          <ArrowLeft size={14} /> Dashboard
        </Link>
        <h1 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter">
          Archivio <span className="text-green-600 not-italic">Consegnati</span>
        </h1>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-8 py-5 text-left text-[10px] font-black uppercase text-slate-400 tracking-widest">Veicolo</th>
                <th className="px-8 py-5 text-left text-[10px] font-black uppercase text-slate-400 tracking-widest">Targa</th>
                <th className="px-8 py-5 text-left text-[10px] font-black uppercase text-slate-400 tracking-widest">Data</th>
                <th className="px-8 py-5 text-right text-[10px] font-black uppercase text-slate-400 tracking-widest">Azioni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {consegnati.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center text-slate-400 font-bold italic uppercase tracking-widest text-xs">
                    Nessun lavoro in archivio
                  </td>
                </tr>
              ) : (
                consegnati.map((task) => (
                  <tr key={task.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <p className="font-black text-slate-800 uppercase italic tracking-tight">{task.cliente}</p>
                      <p className="text-[10px] text-slate-400 font-bold tracking-tight">{task.modello || "Modello non specificato"}</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className="bg-slate-900 text-white px-3 py-1.5 rounded-lg font-black text-[11px] tracking-tighter border-b-2 border-blue-600">
                        {task.targa}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-slate-500 font-bold text-xs">
                        <Calendar size={14} className="text-blue-500" /> {task.dataIngresso}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button
                        onClick={() => handleDeleteRequest(task.id)}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all duration-300 ${
                          confirmDelete === task.id 
                            ? "bg-red-600 text-white scale-105 shadow-lg shadow-red-200" 
                            : "text-slate-300 hover:text-red-600 hover:bg-red-50"
                        }`}
                      >
                        {confirmDelete === task.id ? (
                          <>
                            <AlertCircle size={14} className="animate-bounce" />
                            Sicuro?
                          </>
                        ) : (
                          <Trash2 size={18} />
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}