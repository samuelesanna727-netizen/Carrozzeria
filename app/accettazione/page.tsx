"use client";

import { useState, useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import { Car, User, AlertCircle, CheckCircle2, ArrowLeft, Gauge, Plus } from "lucide-react";
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
    <div className="p-8 w-full max-w-[1400px] mx-auto animate-in fade-in duration-500 relative">
      
      {/* TOAST - Più leggero */}
      <div className={`fixed top-10 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        showToast ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"
      }`}>
        <div className="bg-white text-slate-800 px-6 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-slate-100">
          <CheckCircle2 size={18} className="text-green-500" />
          <span className="font-bold uppercase tracking-widest text-[10px]">Ingresso registrato</span>
        </div>
      </div>

      {/* HEADER */}
      <div className="flex justify-between items-end mb-10 pb-6 border-b border-slate-100">
        <div>
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors mb-4 text-xs font-bold uppercase tracking-widest">
            <ArrowLeft size={14} /> Dashboard
          </Link>
          <h2 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">
            Nuova <span className="text-blue-600">Accettazione</span>
          </h2>
          <p className="text-slate-400 text-sm italic">Registrazione nuovo intervento</p>
        </div>
      </div>

      {/* FORM CONTAINER - Allargato */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* COLONNA SINISTRA: DATI PRINCIPALI */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-8">
            <div className="flex items-center gap-3">
              <Car className="text-blue-600" size={18} />
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Dettagli Mezzo</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Cliente</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={16} />
                  <input
                    type="text" required placeholder="Nome e Cognome"
                    value={formData.cliente}
                    onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
                    className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-400 transition-all font-bold text-slate-700 shadow-sm"
                  />
                </div>
              </div>

              <div className="group">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Targa</label>
                <input
                  type="text" required placeholder="AA000BB"
                  value={formData.targa}
                  onChange={(e) => setFormData({ ...formData, targa: e.target.value.toUpperCase() })}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-400 transition-all font-mono font-bold text-slate-800 shadow-sm text-lg"
                />
              </div>
            </div>

            <div className="group">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Modello e Versione</label>
              <input
                type="text" placeholder="Es. Audi A3 Sportback"
                value={formData.modello}
                onChange={(e) => setFormData({ ...formData, modello: e.target.value })}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-400 transition-all font-bold text-slate-700 shadow-sm"
              />
            </div>

            <div className="group">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Descrizione Intervento</label>
              <textarea
                required placeholder="Indicare i lavori da eseguire..."
                value={formData.descrizione}
                onChange={(e) => setFormData({ ...formData, descrizione: e.target.value })}
                className="w-full p-5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-400 transition-all font-medium text-slate-700 h-40 resize-none shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* COLONNA DESTRA: SETTAGGI TECNICI */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full justify-between">
            
            <div className="space-y-10">
              {/* URGENZA */}
              <div>
                <div className="flex items-center gap-2 mb-6 text-slate-400">
                  <AlertCircle size={16} />
                  <h4 className="font-black uppercase text-[10px] tracking-widest">Priorità Lavoro</h4>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {['Bassa', 'Media', 'Alta'].map((p) => (
                    <button
                      key={p} type="button"
                      onClick={() => setFormData({ ...formData, priorita: p as Priority })}
                      className={`py-3 rounded-lg font-bold text-[10px] uppercase tracking-tighter transition-all border-2 ${
                        formData.priorita === p 
                        ? "bg-blue-50 border-blue-600 text-blue-600 shadow-sm scale-105" 
                        : "bg-white border-slate-100 text-slate-400 hover:border-slate-200"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* DIFFICOLTÀ - Ora molto più chiara e tenue */}
              <div>
                <div className="flex items-center gap-2 mb-6 text-slate-400">
                  <Gauge size={16} />
                  <h4 className="font-black uppercase text-[10px] tracking-widest">Complessità stimata</h4>
                </div>
                <div className="space-y-3">
                  {['Semplice', 'Media', 'Complessa'].map((d) => (
                    <button
                      key={d} type="button"
                      onClick={() => setFormData({ ...formData, difficolta: d as Difficulty })}
                      className={`w-full flex items-center justify-between px-5 py-4 rounded-xl font-bold text-[11px] uppercase tracking-wider transition-all border-2 ${
                        formData.difficolta === d 
                        ? "bg-blue-50/50 border-blue-200 text-blue-700 translate-x-1 shadow-sm" 
                        : "bg-white border-slate-100 text-slate-400 hover:bg-slate-50 hover:border-slate-200"
                      }`}
                    >
                      {d}
                      <div className="flex gap-1.5">
                        {[...Array(d === 'Semplice' ? 1 : d === 'Media' ? 2 : 3)].map((_, i) => (
                          <div key={i} className={`w-1.5 h-4 rounded-full transition-colors ${formData.difficolta === d ? 'bg-blue-400' : 'bg-slate-200'}`} />
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* SUBMIT BUTTON - Pulito */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 shadow-lg shadow-blue-100 transition-all active:scale-[0.98] mt-12"
            >
              <Plus size={18} strokeWidth={3} />
              Conferma Ingresso
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}