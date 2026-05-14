"use client";

import { Settings, Save, Shield, Bell, HardDrive } from "lucide-react";

export default function ImpostazioniPage() {
  return (
    <div className="p-10 max-w-4xl">
      <div className="mb-10">
        <h2 className="text-3xl font-black text-slate-900 uppercase italic">
          Configurazione <span className="text-blue-600 not-italic">Sistema</span>
        </h2>
        <p className="text-slate-500 font-medium">Gestisci le preferenze della tua carrozzeria.</p>
      </div>

      <div className="space-y-6">
        {/* Sezione Profilo */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4 mb-6 text-slate-900">
            <Shield className="text-blue-600" />
            <h3 className="text-xl font-bold uppercase tracking-tight">Sicurezza & Account</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Nome Officina</label>
              <input type="text" defaultValue="Samuele Carrozzeria" className="w-full p-3 border rounded-xl bg-slate-50 font-bold" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Pin Accesso Rapido</label>
              <input type="password" defaultValue="1234" className="w-full p-3 border rounded-xl bg-slate-50" />
            </div>
          </div>
        </div>

        {/* Sezione Notifiche */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Bell className="text-blue-600" />
              <div>
                <h3 className="text-lg font-bold text-slate-900">Notifiche WhatsApp</h3>
                <p className="text-sm text-slate-500">Invia messaggi automatici ai clienti a fine lavoro.</p>
              </div>
            </div>
            <div className="w-12 h-6 bg-blue-600 rounded-full relative">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
        </div>

        <button className="flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-black transition-all">
          <Save size={20} />
          Salva Configurazioni
        </button>
      </div>
    </div>
  );
}