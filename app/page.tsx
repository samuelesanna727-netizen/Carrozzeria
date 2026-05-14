"use client";

import { useTasks } from "./context/TaskContext";
import { 
  Car, Wrench, AlertTriangle, CheckCircle, 
  ArrowRight, Activity, Clock, User, LogOut, Plus 
} from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const { tasks } = useTasks();

  // Logica Logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/login";
  };

  const inOfficina = tasks.filter(t => t.status !== 'Consegnato').length;
  const urgenze = tasks.filter(t => t.priorita === 'Alta' && t.status !== 'Consegnato').length;
  const pronti = tasks.filter(t => t.status === 'Consegnato').length;
  const totaleTask = tasks.length;

  const lavoriRecenti = tasks.filter(t => t.status !== 'Consegnato').slice(0, 4);

  const capMax = 10;
  const percentuale = Math.min(Math.round((inOfficina / capMax) * 100), 100);

  return (
    <div className="p-8 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">
            Pannello <span className="text-blue-600">Controllo</span>
          </h2>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Gestione Flusso Lavoro</p>
        </div>

        <div className="flex items-center gap-3">
          {/* TASTO LOGOUT - Sostituisce il tasto Lock precedente */}
          <button 
            onClick={handleLogout}
            className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
            title="Esci dal sistema"
          >
            <LogOut size={18} />
          </button>

          <Link href="/accettazione" 
            className="group flex items-center gap-2 px-5 py-2.5 bg-blue-600 border-2 border-blue-600 text-white rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all hover:bg-blue-700 hover:border-blue-700 shadow-lg shadow-blue-100"
          >
            <Plus size={14} strokeWidth={3} />
            Nuova Entrata
          </Link>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard label="In Officina" value={inOfficina} icon={<Wrench size={20}/>} color="blue" />
        <StatCard label="Urgenze" value={urgenze} icon={<AlertTriangle size={20}/>} color="red" />
        <StatCard label="Pronti" value={pronti} icon={<CheckCircle size={20}/>} color="green" />
        <StatCard label="Totale Mezzi" value={totaleTask} icon={<Clock size={20}/>} color="slate" />
      </div>

      {/* GRID INFERIORE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        
        {/* COLONNA SINISTRA: ULTIME LAVORAZIONI */}
        <div className="lg:col-span-2 flex flex-col">
          <div className="flex justify-between items-center mb-6 px-2">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
              <Car size={16} className="text-blue-600" /> Ultime Lavorazioni
            </h3>
            <Link href="/lavorazione" className="text-blue-600 text-[10px] font-black uppercase tracking-widest hover:underline px-2">
              Vedi tutto
            </Link>
          </div>

          <div className="flex-grow min-h-[400px]">
            {inOfficina === 0 ? (
              <div className="h-full bg-white rounded-[2rem] border border-slate-200 border-dashed flex items-center justify-center text-slate-400 p-8">
                <p className="font-bold italic text-sm">Nessun lavoro attivo al momento</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
                {lavoriRecenti.map(task => (
                  <div key={task.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all flex flex-col justify-between group">
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg uppercase tracking-tighter border border-blue-100">
                            {task.targa}
                          </span>
                          {task.priorita === 'Alta' && (
                            <div className="p-1.5 bg-red-50 rounded-lg animate-pulse">
                              <AlertTriangle size={14} className="text-red-500" />
                            </div>
                          )}
                        </div>
                        <h4 className="text-base font-black text-slate-800 uppercase truncate mb-1">{task.modello}</h4>
                        <div className="flex items-center gap-2 text-slate-400">
                          <User size={12} className="text-slate-300" />
                          <span className="text-[10px] font-bold uppercase tracking-tight">{task.cliente}</span>
                        </div>
                      </div>
                      <div className="pt-4 mt-6 border-t border-slate-50 flex justify-between items-center">
                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.15em]">{task.status}</span>
                        <Link href="/lavorazione" className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* COLONNA DESTRA: STATO OFFICINA */}
        <div className="flex flex-col">
          <div className="h-full bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-50 rounded-xl text-slate-400">
                  <Activity size={18} />
                </div>
                <h4 className="font-black uppercase text-[11px] tracking-widest text-slate-400">Carico Lavoro</h4>
              </div>
              <span className="text-2xl font-black text-slate-800 italic">{percentuale}%</span>
            </div>
            
            <div className="h-3 bg-slate-50 rounded-full overflow-hidden p-0.5 border border-slate-100 mb-6">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ease-out shadow-sm ${
                  percentuale > 80 ? 'bg-gradient-to-r from-red-500 to-orange-400' : 'bg-gradient-to-r from-blue-600 to-cyan-500'
                }`}
                style={{ width: `${percentuale}%` }}
              />
            </div>
            
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight text-center bg-slate-50 py-2 rounded-lg border border-slate-100">
              {percentuale > 80 ? '⚠️ Richiesta Espansione' : '✅ Flusso Ottimale'}
            </p>

            <div className="mt-auto pt-10">
              <Link href="/consegnate" className="flex items-center justify-between group p-5 bg-blue-50/50 rounded-2xl hover:bg-green-50 transition-all border border-blue-100/50 hover:border-green-100 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <CheckCircle size={16} className="text-green-600" />
                    </div>
                    <span className="text-[11px] font-black text-slate-600 uppercase tracking-widest">Archivio Storico</span>
                  </div>
                  <ArrowRight size={14} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color }: any) {
  const colors: any = {
    blue: "text-blue-600 bg-blue-50 border-blue-100",
    red: "text-red-600 bg-red-50 border-red-100",
    green: "text-green-600 bg-green-50 border-green-100",
    slate: "text-slate-600 bg-slate-50 border-slate-100",
  };

  return (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-2xl border transition-transform group-hover:scale-110 duration-300 ${colors[color]}`}>
          {icon}
        </div>
        <span className="text-3xl font-black text-slate-800 italic tracking-tighter">{value}</span>
      </div>
      <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">{label}</p>
    </div>
  );
}