"use client";

import { Settings, Save, Shield, Bell, HardDrive, User, Building2, Lock, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ImpostazioniPage() {
  return (
    <div className="p-8 w-full max-w-[1400px] mx-auto animate-in fade-in duration-500">
      
      {/* HEADER COERENTE */}
      <div className="flex justify-between items-end mb-10 pb-6 border-b border-slate-100">
        <div>
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors mb-4 text-xs font-bold uppercase tracking-widest">
            <ArrowLeft size={14} /> Dashboard
          </Link>
          <h2 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">
            Configurazione <span className="text-blue-600">Sistema</span>
          </h2>
          <p className="text-slate-400 text-sm italic">Gestisci le preferenze della tua officina</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* COLONNA SINISTRA: IMPOSTAZIONI GENERALI */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* SEZIONE ACCOUNT */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Building2 className="text-blue-600" size={20} />
              </div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Dati Officina</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Nome Attività</label>
                <input 
                  type="text" 
                  defaultValue="Samuele Pro Auto" 
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-400 transition-all font-bold text-slate-700" 
                />
              </div>
              <div className="group">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Email Notifiche</label>
                <input 
                  type="email" 
                  defaultValue="officina@samuele.it" 
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-400 transition-all font-bold text-slate-700" 
                />
              </div>
            </div>
          </div>

          {/* SEZIONE SICUREZZA */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Shield className="text-blue-600" size={20} />
              </div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Sicurezza Accesso</h3>
            </div>

            <div className="max-w-md space-y-6">
              <div className="group">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Pin Accesso Rapido</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                  <input 
                    type="password" 
                    defaultValue="1234" 
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-400 transition-all font-bold text-slate-700" 
                  />
                </div>
                <p className="text-[9px] text-slate-400 mt-2 ml-1">Utilizzato per il log-in rapido dai tablet in officina</p>
              </div>
            </div>
          </div>
        </div>

        {/* COLONNA DESTRA: AUTOMAZIONI E SALVATAGGIO */}
        <div className="space-y-8">
          
          {/* NOTIFICHE */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Bell className="text-blue-600" size={20} />
              </div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Automazioni</h3>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <p className="text-xs font-bold text-slate-700 uppercase tracking-tight">WhatsApp Clienti</p>
                  <p className="text-[10px] text-slate-400 italic">Messaggio a fine lavoro</p>
                </div>
                <button className="w-10 h-5 bg-blue-600 rounded-full relative transition-all shadow-inner shadow-blue-800/20">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm"></div>
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <p className="text-xs font-bold text-slate-700 uppercase tracking-tight">Backup Cloud</p>
                  <p className="text-[10px] text-slate-400 italic">Salvataggio ogni 24h</p>
                </div>
                <button className="w-10 h-5 bg-slate-200 rounded-full relative transition-all">
                  <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                </button>
              </div>
            </div>
          </div>

          {/* AZIONE DI SALVATAGGIO */}
          <div className="bg-blue-600 p-8 rounded-2xl shadow-lg shadow-blue-100 text-center space-y-4">
            <p className="text-white/80 text-[10px] font-bold uppercase tracking-[0.2em]">Conferma Modifiche</p>
            <button className="w-full bg-white text-blue-600 py-4 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-md hover:bg-slate-50 transition-all active:scale-95">
              <Save size={18} />
              Salva Tutto
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}