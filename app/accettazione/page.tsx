"use client";

import { useState, useEffect, useRef } from "react";
// Importiamo l'azione che scriverà nel DB
import { createVehicle } from "../actions";
import { Car, Bike, User, AlertCircle, CheckCircle2, ArrowLeft, Gauge, Plus } from "lucide-react";
import Link from "next/link";
import databaseVeicoli from "../data/modelli.json";

type Priority = "Bassa" | "Media" | "Alta";
type Difficulty = "Semplice" | "Media" | "Complessa";
type Categoria = "Auto" | "Moto";

export default function AccettazionePage() {
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Per gestire il caricamento
  const [showMarcheSuggestions, setShowMarcheSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [categoria, setCategoria] = useState<Categoria>("Auto");

  const [formData, setFormData] = useState({
    cliente: "",
    targa: "",
    marca: "",
    modello: "",
    descrizione: "",
    priorita: "Media" as Priority,
    difficolta: "Media" as Difficulty,
  });

  const dbCorrente = categoria === "Auto" ? databaseVeicoli.auto : databaseVeicoli.moto;
  const elencoMarche = Object.keys(dbCorrente).sort();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowMarcheSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // GESTIONE INVIO AL DATABASE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    let success = false; 
    
    try {
      await createVehicle({
        cliente: formData.cliente,
        targa: formData.targa,
        modello: `${formData.marca} ${formData.modello}`,
        descrizione: `[${formData.difficolta.toUpperCase()}] ${formData.descrizione}`,
        priorita: formData.priorita,
        categoria: categoria,
      });

      success = true; 
    } catch (error: any) { // 👈 Risolto qui: forzato il tipo ad 'any' per digerire le proprietà di Next.js
      // Intercettiamo il finto errore del redirect di Next.js per non mostrare l'alert
      if (
        (error instanceof Error && error.message.includes("NEXT_REDIRECT")) || 
        (error?.digest && error.digest.includes("NEXT_REDIRECT")) ||
        (error?.message && error.message.includes("NEXT_REDIRECT"))
      ) {
        success = true; 
      } else {
        console.error("Errore reale nel salvataggio:", error);
        alert("Errore nel salvataggio del veicolo. Controlla la console del server.");
      }
    } finally {
      setIsSubmitting(false);
      
      if (success) {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        
        setFormData({
          cliente: "", targa: "", marca: "", modello: "", descrizione: "",
          priorita: "Media", difficolta: "Media"
        });
      }
    }
  };

  const filteredMarche = formData.marca.length > 0
    ? elencoMarche.filter(m => m.toLowerCase().includes(formData.marca.toLowerCase()))
    : [];

  return (
    <div className="p-6 lg:p-8 w-full max-w-[1400px] mx-auto animate-in fade-in duration-500 relative font-sans text-left">

      {/* TOAST NOTIFICATION */}
      <div className={`fixed top-10 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${showToast ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"}`}>
        <div className="bg-white text-slate-800 px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-100">
          <CheckCircle2 size={18} className="text-green-500" />
          <span className="font-black uppercase tracking-widest text-[10px]">Ingresso Registrato</span>
        </div>
      </div>

      {/* HEADER */}
      <div className="flex justify-between items-end mb-10 pb-6 border-b border-slate-100">
        <div>
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors mb-4 text-[10px] font-black uppercase tracking-[0.2em]">
            <ArrowLeft size={14} /> Torna al Tabellone
          </Link>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
            Nuova <span className="text-blue-600 italic">Accettazione</span>
          </h2>
        </div>
      </div>

      {/* CATEGORY SWITCHER */}
      <div className="flex bg-slate-100 p-1 rounded-2xl w-fit mb-8 gap-1">
        <button
          type="button"
          onClick={() => { setCategoria("Auto"); setFormData({ ...formData, marca: "", modello: "" }); }}
          className={`flex items-center gap-3 px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${categoria === "Auto" ? "bg-white text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
        >
          <Car size={16} /> Auto
        </button>
        <button
          type="button"
          onClick={() => { setCategoria("Moto"); setFormData({ ...formData, marca: "", modello: "" }); }}
          className={`flex items-center gap-3 px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${categoria === "Moto" ? "bg-white text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
        >
          <Bike size={16} /> Moto
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 lg:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-8">
            <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
              {categoria === "Auto" ? <Car className="text-blue-600" size={18} /> : <Bike className="text-blue-600" size={18} />}
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Anagrafica {categoria}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Cliente</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                  <input
                    type="text" required placeholder="Nome Cognome"
                    value={formData.cliente}
                    onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:bg-white focus:border-blue-400 transition-all font-bold text-slate-700"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Targa</label>
                <input
                  type="text" required maxLength={7} placeholder="AA123BB"
                  value={formData.targa}
                  onChange={(e) => {
                    const val = e.target.value.toUpperCase().replace(/\s/g, "");
                    if (val.length <= 7) setFormData({ ...formData, targa: val });
                  }}
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:bg-white focus:border-blue-400 transition-all font-mono font-black text-slate-800 text-lg uppercase"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 relative" ref={wrapperRef}>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Marca</label>
                <input
                  type="text" required placeholder="Scrivi marca..."
                  value={formData.marca}
                  onFocus={() => setShowMarcheSuggestions(true)}
                  onChange={(e) => {
                    setFormData({ ...formData, marca: e.target.value, modello: "" });
                    setShowMarcheSuggestions(true);
                  }}
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:bg-white focus:border-blue-400 transition-all font-bold text-slate-700"
                />

                {showMarcheSuggestions && filteredMarche.length > 0 && (
                  <div className="absolute z-50 w-full mt-2 bg-white border border-slate-100 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                    {filteredMarche.map((m) => (
                      <button
                        key={m} type="button"
                        onClick={() => {
                          setFormData({ ...formData, marca: m, modello: "" });
                          setShowMarcheSuggestions(false);
                        }}
                        className="w-full text-left px-5 py-3 text-sm font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-slate-50 last:border-0"
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Modello</label>
                <input
                  list="modelli-list"
                  placeholder={formData.marca ? `Modelli ${formData.marca}...` : "Scegli prima la marca"}
                  disabled={!formData.marca}
                  value={formData.modello}
                  onChange={(e) => setFormData({ ...formData, modello: e.target.value })}
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:bg-white focus:border-blue-400 transition-all font-bold text-slate-700 disabled:opacity-50"
                />
                <datalist id="modelli-list">
                  {formData.marca && (dbCorrente as any)[formData.marca]?.map((mod: string) => (
                    <option key={mod} value={mod} />
                  ))}
                </datalist>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Descrizione Intervento</label>
              <textarea
                required placeholder="Descrivi il lavoro..."
                value={formData.descrizione}
                onChange={(e) => setFormData({ ...formData, descrizione: e.target.value })}
                className="w-full p-5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:bg-white focus:border-blue-400 transition-all font-medium text-slate-700 h-32 resize-none"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full justify-between">
            <div className="space-y-10">
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
                      className={`py-3 rounded-lg font-bold text-[10px] uppercase tracking-tighter transition-all border-2 ${formData.priorita === p
                        ? "bg-blue-50 border-blue-600 text-blue-600 shadow-sm scale-105"
                        : "bg-white border-slate-100 text-slate-400 hover:border-slate-200"
                        }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-6 text-slate-400">
                  <Gauge size={16} />
                  <h4 className="font-black uppercase text-[10px] tracking-widest">Complessità</h4>
                </div>
                <div className="space-y-3">
                  {['Semplice', 'Media', 'Complessa'].map((d) => (
                    <button
                      key={d} type="button"
                      onClick={() => setFormData({ ...formData, difficolta: d as Difficulty })}
                      className={`w-full flex items-center justify-between px-5 py-4 rounded-xl font-bold text-[11px] uppercase tracking-wider transition-all border-2 ${formData.difficolta === d
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

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 shadow-lg shadow-blue-100 transition-all active:scale-[0.98] mt-12 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Plus size={18} strokeWidth={3} />
              {isSubmitting ? "Registrazione..." : "Conferma Ingresso"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}