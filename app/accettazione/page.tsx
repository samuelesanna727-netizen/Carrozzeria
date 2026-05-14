"use client";

import { useState, useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import { Car, User, Hash, AlertCircle, CheckCircle2, FileText, ArrowLeft, Gauge } from "lucide-react";
import Link from "next/link";

type Priority = "Bassa" | "Media" | "Alta";
type Difficulty = "Semplice" | "Media" | "Complessa";

export default function AccettazionePage() {
  const { addTask } = useTasks();
  const [showToast, setShowToast] = useState(false);
  
  const [formData, setFormData] = useState({
    cliente: "",
    targa: "",
    modello: "",
    descrizione: "",
    priorita: "Media" as Priority,
    difficolta: "Media" as Difficulty,
  });

  // Timer per nascondere il messaggio
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addTask({
      cliente: formData.cliente,
      targa: formData.targa,
      modello: formData.modello,
      descrizione: `[${formData.difficolta.toUpperCase()}] ${formData.descrizione}`,
      priorita: formData.priorita,
      status: "In Corso" as any,
    });

    setShowToast(true);
    setFormData({ 
      cliente: "", targa: "", modello: "", descrizione: "",
      priorita: "Media", difficolta: "Media" 
    });
  };

  return (
    <div className="p-8 max-w-6xl mx-auto relative">
      
      {/* MESSAGGIO DI CONFERMA SEMPLICE (TOAST) */}
      <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        showToast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}>
        <div className="bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700">
          <CheckCircle2 size={20} className="text-green-400" />
          <span className="font-bold uppercase tracking-widest text-[11px]">Lavoro aggiunto con successo</span>
        </div>
      </div>

      {/* HEADER ORIGINALE */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors font-bold uppercase text-[10px] tracking-widest mb-2">
            <ArrowLeft size={14} /> Torna alla Dashboard
          </Link>
          <h1 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter">
            Nuova <span className="text-blue-600 not-italic">Accettazione</span>
          </h1>
        </div>
      </div>

      {/* FORM ORIGINALE */}
      <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          <div className="p-10 border-r border-slate-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                <Car size={20} />
              </div>
              <h3 className="text-xl font-black uppercase italic text-slate-800">Dati Veicolo</h3>
            </div>

            <div className="space-y-6">
              <div className="group">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 mb-2 block">Proprietario / Cliente *</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={18} />
                  <input
                    type="text" required placeholder="Nome e Cognome"
                    value={formData.cliente}
                    onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-blue-600 transition-all font-bold text-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="group">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 mb-2 block">Targa *</label>
                  <input
                    type="text" required placeholder="AA000BB"
                    value={formData.targa}
                    onChange={(e) => setFormData({ ...formData, targa: e.target.value.toUpperCase() })}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-blue-600 transition-all font-black text-slate-800 uppercase"
                  />
                </div>
                <div className="group">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 mb-2 block">Modello</label>
                  <input
                    type="text" placeholder="Es. Fiat Panda"
                    value={formData.modello}
                    onChange={(e) => setFormData({ ...formData, modello: e.target.value })}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-blue-600 transition-all font-bold text-slate-700"
                  />
                </div>
              </div>

              <div className="group">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 mb-2 block">Descrizione Lavoro *</label>
                <textarea
                  required placeholder="Descrivi l'intervento..."
                  value={formData.descrizione}
                  onChange={(e) => setFormData({ ...formData, descrizione: e.target.value })}
                  className="w-full p-6 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-blue-600 transition-all font-bold text-slate-700 h-32 resize-none"
                />
              </div>
            </div>
          </div>

          <div className="p-10 bg-slate-50/50 flex flex-col justify-between">
            <div className="space-y-10">
              {/* SEZIONE URGENZA */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <AlertCircle className="text-orange-500" size={18} />
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-800 italic">Urgenza</h3>
                </div>
                <div className="flex gap-3">
                  {['Bassa', 'Media', 'Alta'].map((p) => (
                    <button
                      key={p} type="button"
                      onClick={() => setFormData({ ...formData, priorita: p as Priority })}
                      className={`flex-1 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border-2 ${
                        formData.priorita === p 
                        ? "bg-white border-blue-600 text-blue-600 shadow-md scale-105" 
                        : "bg-white border-slate-200 text-slate-400"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* SEZIONE DIFFICOLTÀ */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Gauge className="text-purple-500" size={18} />
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-800 italic">Difficoltà</h3>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {['Semplice', 'Media', 'Complessa'].map((d) => (
                    <button
                      key={d} type="button"
                      onClick={() => setFormData({ ...formData, difficolta: d as Difficulty })}
                      className={`flex items-center justify-between px-6 py-4 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all border-2 ${
                        formData.difficolta === d 
                        ? "bg-white border-purple-600 text-purple-600 shadow-md translate-x-2" 
                        : "bg-white border-slate-200 text-slate-400"
                      }`}
                    >
                      {d}
                      <div className="flex gap-1">
                        {[...Array(d === 'Semplice' ? 1 : d === 'Media' ? 2 : 3)].map((_, i) => (
                          <div key={i} className={`w-1.5 h-4 rounded-full ${formData.difficolta === d ? 'bg-purple-600' : 'bg-slate-300'}`} />
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-xl transition-all active:scale-95 mt-10"
            >
              <CheckCircle2 size={24} />
              Registra Ingresso
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}