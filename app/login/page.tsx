"use client";
import { useState, useEffect } from "react";
import { Lock, User, ArrowRight, Sparkles } from "lucide-react";

export default function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("adminCredentials")) {
      setIsRegistering(true);
    }
  }, []);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegistering) {
      localStorage.setItem("adminCredentials", JSON.stringify({ user: username, pass: password }));
      alert("Account creato con successo! ✨");
      setIsRegistering(false);
      setUsername(""); 
      setPassword("");
    } else {
      const saved = JSON.parse(localStorage.getItem("adminCredentials") || "{}");
      if (username === saved.user && password === saved.pass) {
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "/";
      } else {
        alert("Ops! Le credenziali non sono corrette ✨");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/50 flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-[440px] animate-in fade-in zoom-in duration-700">
        
        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-white rounded-2xl shadow-sm border border-slate-100 mb-4 text-blue-400">
            <Sparkles size={24} strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-semibold text-slate-800 tracking-tight">
            {isRegistering ? "Benvenuto in " : "Bentornato in "} 
            <span className="text-blue-500 font-black">Carrozzeria</span>
          </h1>
          <p className="text-slate-400 text-sm mt-2 font-medium">
            {isRegistering ? "Crea le tue credenziali di accesso" : "Accedi per gestire la tua officina"}
          </p>
        </div>

        {/* CARD */}
        <div className="bg-white/70 backdrop-blur-xl p-10 rounded-[2rem] border border-white shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
          <form onSubmit={handleAuth} className="space-y-5">
            
            {/* USERNAME */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-4">Username</label>
              <div className="relative group">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-400 transition-colors" size={18} />
                <input 
                  type="text" 
                  required
                  placeholder="Inserisci il tuo nome"
                  className="w-full pl-13 pr-6 py-4 bg-white/50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-200 font-medium text-slate-600 transition-all placeholder:text-slate-300"
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            {/* PASSWORD - CORRETTA QUI */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-4">Password</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-400 transition-colors" size={18} />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full pl-13 pr-6 py-4 bg-white/50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-200 font-medium text-slate-600 transition-all placeholder:text-slate-300"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} // <--- Correzione effettuata!
                />
              </div>
            </div>

            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 transition-all shadow-lg shadow-blue-200/50 active:scale-[0.98] mt-6">
              {isRegistering ? "Inizia il setup" : "Entra nel pannello"}
              <ArrowRight size={18} />
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-slate-300 font-medium text-[11px] uppercase tracking-widest">
           ProAuto Officina Digitale
        </p>
      </div>
    </div>
  );
}