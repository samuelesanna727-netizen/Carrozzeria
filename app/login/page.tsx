"use client";
import { useState, useEffect } from "react";
import { Lock, User, ArrowRight, Sparkles, UserMinus, AlertCircle, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // 1. Caricamento iniziale - Solo una volta al montaggio
  useEffect(() => {
    const checkAccount = () => {
      const savedAdmin = localStorage.getItem("adminCredentials");
      // Se non esiste l'account, mostra la registrazione
      if (!savedAdmin || savedAdmin === "undefined" || savedAdmin === "null") {
        setIsRegistering(true);
      } else {
        setIsRegistering(false);
      }
    };
    checkAccount();
  }, []);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (isRegistering) {
      // --- LOGICA REGISTRAZIONE ---
      if (password.length < 4) {
        setErrorMessage("Password troppo corta (min. 4 caratteri)");
        return;
      }
      
      const adminData = { user: username, password: password };
      localStorage.setItem("adminCredentials", JSON.stringify(adminData));
      
      setSuccessMessage("Account creato! Ora inserisci i dati per entrare.");
      
      // Reset dei campi e switch al login
      setTimeout(() => {
        setIsRegistering(false);
        setUsername("");
        setPassword("");
      }, 500);

    } else {
      // --- LOGICA LOGIN ---
      const savedData = localStorage.getItem("adminCredentials");
      if (savedData) {
        try {
          const saved = JSON.parse(savedData);
          if (username === saved.user && password === saved.password) {
            // Salvataggio sessione temporanea
            sessionStorage.setItem("isLoggedIn", "true");
            // Redirect secco
            window.location.replace("/"); 
          } else {
            setErrorMessage("Username o Password errati");
          }
        } catch (err) {
          setErrorMessage("Errore nel database locale. Usa 'Eliminazione Account'");
        }
      }
    }
  };

  const eliminazioneAccount = () => {
    if (confirm("Sei sicuro? Questa azione eliminerà l'account e tutti i dati di accesso.")) {
      localStorage.clear(); // Pulisce tutto per sicurezza
      sessionStorage.clear();
      setIsRegistering(true);
      setUsername("");
      setPassword("");
      setSuccessMessage("Account eliminato correttamente.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-[400px] animate-in fade-in duration-500">
        
        <div className="text-center mb-10">
          <div className="inline-flex p-4 bg-slate-50 rounded-3xl mb-6 text-blue-500 border border-slate-100">
            <Sparkles size={28} />
          </div>
          <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tighter italic">
            Pro<span className="text-blue-500">Auto</span>
          </h1>
        </div>

        <div className="bg-white p-2 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
          <div className="p-8 rounded-[2.2rem]">
            
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-700 mb-6 text-center">
              {isRegistering ? "Configurazione Iniziale" : "Accesso Riservato"}
            </h2>

            {errorMessage && (
              <div className="mb-6 p-4 bg-red-50 text-red-500 rounded-2xl flex items-center gap-3 animate-in zoom-in">
                <AlertCircle size={18} />
                <span className="text-[10px] font-black uppercase tracking-tight">{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="mb-6 p-4 bg-blue-50 text-blue-600 rounded-2xl flex items-center gap-3 animate-in zoom-in">
                <CheckCircle2 size={18} />
                <span className="text-[10px] font-black uppercase tracking-tight">{successMessage}</span>
              </div>
            )}

            <form onSubmit={handleAuth} className="space-y-6 text-left">
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Username</label>
                <div className="relative">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="text" 
                    required
                    autoComplete="off"
                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-blue-500/20 font-bold text-slate-700 transition-all"
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="password" 
                    required
                    className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-blue-500/20 font-bold text-slate-700 transition-all"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-500/20 active:scale-95">
                {isRegistering ? "Crea Account" : "Entra"}
                <ArrowRight size={16} />
              </button>
            </form>

            {!isRegistering && (
              <div className="mt-8 pt-6 border-t border-slate-50">
                <button 
                  type="button"
                  onClick={eliminazioneAccount}
                  className="w-full flex items-center justify-center gap-2 text-slate-300 hover:text-red-500 transition-all group"
                >
                  <UserMinus size={14} />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em]">Eliminazione account</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}