"use client";

import { useTasks } from "./context/TaskContext";
import { useEffect, useState } from "react";
import { 
  Wrench, AlertTriangle, CheckCircle, 
  ArrowRight, Activity, Clock, User, Plus, Car
} from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const { tasks } = useTasks();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      window.location.replace("/login");
    } else {
      setAuthorized(true);
    }
  }, []);

  // Logica Dati
  const inOfficina = tasks.filter(t => t.status !== 'Consegnato').length;
  const urgenze = tasks.filter(t => t.priorita === 'Alta' && t.status !== 'Consegnato').length;
  const pronti = tasks.filter(t => t.status === 'Consegnato').length;
  const totaleTask = tasks.length;
  const lavoriRecenti = tasks.filter(t => t.status !== 'Consegnato').slice(0, 4);
  
  const capMax = 10;
  const percentuale = Math.min(Math.round((inOfficina / capMax) * 100), 100);

  if (!authorized) return null;

  return (
    <div className="p-6 lg:p-8 max-w-[1500px] mx-auto animate-in fade-in duration-700 font-sans">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight uppercase">
            Pannello <span className="text-blue-600">Controllo</span>
          </h2>
          <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em] mt-1">Gestione Flusso Lavoro</p>
        </div>

        <Link href="/accettazione" 
          className="group flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all hover:bg-blue-700 shadow-sm active:scale-95"
        >
          <Plus size={14} strokeWidth={3} />
          Nuova Entrata
        </Link>
      </div>

      {/* STATS GRID - Border radius ridotto a xl */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="In Officina" value={inOfficina} icon={<Wrench size={18}/>} color="blue" />
        <StatCard label="Urgenze" value={urgenze} icon={<AlertTriangle size={18}/>} color="red" />
        <StatCard label="Pronti" value={pronti} icon={<CheckCircle size={18}/>} color="green" />
        <StatCard label="Totale Mezzi" value={totaleTask} icon={<Clock size={18}/>} color="slate" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        
        {/* COLONNA SINISTRA: ULTIME LAVORAZIONI */}
        <div className="lg:col-span-2 flex flex-col text-left">
          <div className="flex justify-between items-center mb-4 px-1">
            <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
              <Car size={14} className="text-blue-600" /> Ultime Lavorazioni
            </h3>
            <Link href="/lavorazione" className="text-blue-600 text-[9px] font-bold uppercase tracking-widest hover:underline">
              Vedi tutto
            </Link>
          </div>

          <div className="grid gap-3">
            {inOfficina === 0 ? (
              <div className="h-40 bg-white rounded-2xl border border-slate-100 border-dashed flex items-center justify-center text-slate-300">
                <p className="font-bold italic text-xs uppercase tracking-widest">Nessun lavoro attivo</p>
              </div>
            ) : (
              lavoriRecenti.map(task => (
                <div key={task.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:border-blue-200 transition-all flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50/50 px-2.5 py-1 rounded-md border border-blue-100">
                      {task.targa}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-700 uppercase leading-none">{task.modello}</h4>
                      <p className="text-[10px] text-slate-400 font-medium mt-1 uppercase tracking-tighter">{task.cliente}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-5">
                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{task.status}</span>
                    {task.priorita === 'Alta' && <AlertTriangle size={14} className="text-red-500 animate-pulse" />}
                    <Link href="/lavorazione" className="p-2 bg-slate-50 rounded-lg text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* COLONNA DESTRA: STATO OFFICINA */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-50 rounded-lg text-blue-600">
                <Activity size={18} />
              </div>
              <h4 className="font-black uppercase text-[9px] tracking-widest text-slate-400">Carico Lavoro</h4>
            </div>
            <span className="text-xl font-black text-slate-800 italic">{percentuale}%</span>
          </div>
          
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-6">
            <div 
              className={`h-full transition-all duration-1000 ${percentuale > 80 ? 'bg-red-500' : 'bg-blue-600'}`}
              style={{ width: `${percentuale}%` }}
            />
          </div>
          
          <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest text-center bg-slate-50 py-2.5 rounded-xl border border-slate-50 mb-6">
            {percentuale > 80 ? '⚠️ Capacità Critica' : '✅ Flusso Ottimale'}
          </p>

          <div className="mt-auto">
            <Link href="/consegnate" className="flex items-center justify-between group p-4 bg-white rounded-xl hover:bg-slate-50 transition-all border border-slate-100">
              <div className="flex items-center gap-3">
                <CheckCircle size={16} className="text-slate-400 group-hover:text-blue-600" />
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Archivio Storico</span>
              </div>
              <ArrowRight size={14} className="text-slate-300 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color }: any) {
  const colors: any = {
    blue: "text-blue-600 bg-blue-50/50",
    red: "text-red-500 bg-red-50/50",
    green: "text-green-600 bg-green-50/50",
    slate: "text-slate-400 bg-slate-50/50",
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group text-left">
      <div>
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <span className="text-2xl font-black text-slate-800 italic">{value}</span>
      </div>
      <div className={`p-3 rounded-xl transition-transform group-hover:scale-110 duration-300 ${colors[color]}`}>
        {icon}
      </div>
    </div>
  );
}