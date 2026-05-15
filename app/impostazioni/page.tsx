"use client";

import { useState, useEffect } from "react";
import { 
  Save, Building2, Lock, ArrowLeft, 
  LogOut, Clock, CheckCircle2,
  ChevronRight, Key, Percent, AlertOctagon,
  UserMinus, X, Check, ShieldAlert
} from "lucide-react";
import Link from "next/link";

type SettingsState = {
  nomeAttivita: string;
  pIva: string;
  emailNotifiche: string;
  vecchiaPassword: string;
  nuovaPassword: string;
  confermaPassword: string;
  pinAccesso: string;
  aliquotaIva: string;
  autoBackup: boolean;
  notificheScadenza: boolean;
};

export default function ImpostazioniPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  // Stati per la gestione della sicurezza
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [delUser, setDelUser] = useState("");
  const [delPass, setDelPass] = useState("");
  const [delError, setDelError] = useState("");

  const [settings, setSettings] = useState<SettingsState>({
    nomeAttivita: "Samuele Pro Auto",
    pIva: "IT01234567890",
    emailNotifiche: "officina@samuele.it",
    vecchiaPassword: "",
    nuovaPassword: "",
    confermaPassword: "",
    pinAccesso: "1234",
    aliquotaIva: "22",
    autoBackup: true,
    notificheScadenza: true
  });

  useEffect(() => {
    const saved = localStorage.getItem("proauto_config");
    if (saved) {
      setSettings(prev => ({ ...prev, ...JSON.parse(saved) }));
    }
  }, []);

  const handleSave = () => {
    setError("");
    const storedAdmin = localStorage.getItem("adminCredentials");
    let currentPassword = "admin";

    if (storedAdmin) {
      try {
        const parsed = JSON.parse(storedAdmin);
        currentPassword = typeof parsed === 'object' ? parsed.password : parsed;
      } catch (e) {
        currentPassword = storedAdmin;
      }
    }

    if (settings.vecchiaPassword || settings.nuovaPassword || settings.confermaPassword) {
      if (settings.vecchiaPassword !== currentPassword) {
        setError("La password attuale inserita non è corretta.");
        return;
      }
      if (settings.nuovaPassword !== settings.confermaPassword) {
        setError("La nuova password e la conferma non coincidono.");
        return;
      }
      if (settings.nuovaPassword.length < 4) {
        setError("La nuova password deve essere di almeno 4 caratteri.");
        return;
      }
      localStorage.setItem("adminCredentials", JSON.stringify({ user: "admin", password: settings.nuovaPassword }));
    }

    setIsSaving(true);
    setTimeout(() => {
      const { vecchiaPassword, nuovaPassword, confermaPassword, ...configToSave } = settings;
      localStorage.setItem("proauto_config", JSON.stringify(configToSave));
      setIsSaving(false);
      setShowSuccess(true);
      setSettings(prev => ({ ...prev, vecchiaPassword: "", nuovaPassword: "", confermaPassword: "" }));
      setTimeout(() => setShowSuccess(false), 3000);
    }, 800);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    window.location.href = "/login";
  };

  const handleDeleteAccount = (e: React.FormEvent) => {
    e.preventDefault();
    const storedAdmin = localStorage.getItem("adminCredentials");
    if (storedAdmin) {
      const { user, password } = JSON.parse(storedAdmin);
      if (delUser === user && delPass === password) {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "/login";
      } else {
        setDelError("Credenziali errate");
        setTimeout(() => setDelError(""), 3000);
      }
    }
  };

  const toggleSetting = (key: keyof SettingsState) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-8 w-full max-w-[1400px] mx-auto animate-in fade-in duration-500 bg-white text-slate-600 min-h-screen">
      
      {/* HEADER */}
      <div className="flex justify-between items-end mb-12 border-b border-slate-50 pb-8">
        <div>
          <Link href="/" className="flex items-center gap-2 text-slate-300 hover:text-blue-500 transition-all mb-4 text-[9px] font-black uppercase tracking-[0.3em]">
            <ArrowLeft size={12} /> Dashboard
          </Link>
          <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter text-left">
            System <span className="text-blue-500 italic">Settings</span>
          </h2>
        </div>

        {showSuccess && (
          <div className="flex items-center gap-2 bg-green-50 text-green-600 px-6 py-3 rounded-xl border border-green-100 animate-in zoom-in text-left">
            <CheckCircle2 size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Configurazione salvata</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 text-left">
        
        {/* COLONNA INPUT PRINCIPALI */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-4">
              <Building2 className="text-blue-500" size={18} />
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-800">Dati Officina</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Nome Attività</label>
                <input 
                  type="text" 
                  value={settings.nomeAttivita} 
                  onChange={e => setSettings({...settings, nomeAttivita: e.target.value})} 
                  className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-lg outline-none focus:bg-white focus:border-blue-400 font-bold transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Partita IVA</label>
                <input 
                  type="text" 
                  value={settings.pIva} 
                  onChange={e => setSettings({...settings, pIva: e.target.value})} 
                  className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-lg outline-none focus:bg-white focus:border-blue-400 font-bold transition-all" 
                />
              </div>
            </div>
          </section>

          <section className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Key className="text-blue-500" size={18} />
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-800">Gestione Password</h3>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg text-red-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 animate-in slide-in-from-left-2">
                <AlertOctagon size={14} /> {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Vecchia Password</label>
                <input 
                  type="password" 
                  value={settings.vecchiaPassword} 
                  onChange={e => setSettings({...settings, vecchiaPassword: e.target.value})} 
                  className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-lg outline-none focus:bg-white focus:border-blue-400 font-bold transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Nuova Password</label>
                <input 
                  type="password" 
                  value={settings.nuovaPassword} 
                  onChange={e => setSettings({...settings, nuovaPassword: e.target.value})} 
                  className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-lg outline-none focus:bg-white focus:border-blue-400 font-bold transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Conferma Nuova</label>
                <input 
                  type="password" 
                  value={settings.confermaPassword} 
                  onChange={e => setSettings({...settings, confermaPassword: e.target.value})} 
                  className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-lg outline-none focus:bg-white focus:border-blue-400 font-bold transition-all" 
                />
              </div>
            </div>
          </section>
        </div>

        {/* COLONNA LATERALE */}
        <div className="space-y-6">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className={`w-full py-5 rounded-xl font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-100 border ${
              isSaving ? "bg-slate-50 text-slate-300 border-slate-100" : "bg-blue-500 text-white border-blue-500 hover:bg-blue-600 active:scale-[0.97]"
            }`}
          >
            {isSaving ? <Clock className="animate-spin" size={16} /> : <Save size={16} />}
            {isSaving ? "Sincronizzazione..." : "Salva Tutto"}
          </button>

          <div className="bg-slate-50/50 p-6 rounded-xl border border-slate-100 space-y-4">
            {/* PIN E BACKUP (INVARIATI) */}
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-100">
              <span className="text-[10px] font-black text-slate-700 uppercase tracking-tight">Pin Rapido Tablet</span>
              <input type="text" maxLength={4} value={settings.pinAccesso} onChange={e => setSettings({...settings, pinAccesso: e.target.value})} className="w-12 text-right font-black text-blue-600 outline-none bg-transparent" />
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-100">
              <span className="text-[10px] font-black text-slate-700 uppercase">Backup Cloud</span>
              <button onClick={() => toggleSetting("autoBackup")} className={`w-9 h-5 rounded-full relative transition-all ${settings.autoBackup ? "bg-blue-500" : "bg-slate-200"}`}>
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${settings.autoBackup ? "right-1" : "left-1"}`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-100">
              <span className="text-[10px] font-black text-slate-700 uppercase tracking-tight">Iva Default</span>
              <div className="flex items-center gap-1">
                <input type="text" value={settings.aliquotaIva} onChange={e => setSettings({...settings, aliquotaIva: e.target.value})} className="w-6 text-right font-black text-blue-600 outline-none bg-transparent" />
                <Percent size={12} className="text-slate-300" />
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-100">
            {/* LOGOUT CON DOPPIA CONFERMA */}
            {!confirmLogout ? (
              <button 
                onClick={() => setConfirmLogout(true)}
                className="w-full flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:bg-orange-50 transition-all group"
              >
                <div className="flex items-center gap-3 text-left">
                  <LogOut size={16} className="text-slate-400 group-hover:text-orange-500" />
                  <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Chiudi Sessione</span>
                </div>
                <ChevronRight size={14} className="text-slate-200" />
              </button>
            ) : (
              <div className="flex gap-2 animate-in slide-in-from-right-2">
                <button onClick={handleLogout} className="flex-1 p-4 bg-orange-500 text-white rounded-xl font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-2">
                  <Check size={14} /> Conferma
                </button>
                <button onClick={() => setConfirmLogout(false)} className="p-4 bg-slate-100 text-slate-400 rounded-xl">
                  <X size={14} />
                </button>
              </div>
            )}

            {/* ELIMINAZIONE ACCOUNT CON FORM E CONFERMA */}
            {!showDeleteForm ? (
              <button 
                onClick={() => setShowDeleteForm(true)}
                className="w-full p-4 text-[9px] font-black text-red-300 uppercase tracking-widest hover:text-red-500 transition-colors flex items-center justify-center gap-2"
              >
                <UserMinus size={12} /> Eliminazione Account
              </button>
            ) : (
              <div className="bg-red-50 p-6 rounded-xl border border-red-100 animate-in zoom-in space-y-4 shadow-inner">
                <div className="flex items-center gap-2 text-red-600 mb-2">
                  <ShieldAlert size={16} />
                  <span className="text-[10px] font-black uppercase">Verifica Sicurezza</span>
                </div>
                
                <form onSubmit={handleDeleteAccount} className="space-y-3">
                  <input 
                    type="text" 
                    placeholder="Nome Utente" 
                    className="w-full p-3 bg-white border border-red-200 rounded-lg outline-none text-[11px] font-bold"
                    value={delUser}
                    onChange={(e) => setDelUser(e.target.value)}
                    required
                  />
                  <input 
                    type="password" 
                    placeholder="Password" 
                    className="w-full p-3 bg-white border border-red-200 rounded-lg outline-none text-[11px] font-bold"
                    value={delPass}
                    onChange={(e) => setDelPass(e.target.value)}
                    required
                  />
                  
                  <div className="flex gap-2 pt-2">
                    <button type="submit" className="flex-1 p-3 bg-red-600 text-white rounded-lg font-black text-[9px] uppercase">
                      Elimina Definitivamente
                    </button>
                    <button type="button" onClick={() => setShowDeleteForm(false)} className="p-3 bg-white text-slate-400 rounded-lg border border-red-100">
                      <X size={14} />
                    </button>
                  </div>
                  {delError && <p className="text-[8px] text-red-500 font-black uppercase text-center">{delError}</p>}
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}