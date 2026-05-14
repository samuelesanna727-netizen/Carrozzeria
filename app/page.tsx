"use client";

import { useTasks } from "./context/TaskContext";
import { 
  Car, Wrench, AlertTriangle, CheckCircle, 
  ArrowRight, Activity, Clock, User, Lock, Plus
} from "lucide-react";
import Link from "next/link";


export default function Dashboard() {
  const { tasks } = useTasks();

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
  </div>

  <div className="flex items-center gap-3">
    {/* TASTO LOGIN ADMIN DISCRETO */}
    <Link href="/login" 
      className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
      title="Accesso Admin"
    >
      <Lock size={18} />
    </Link>

    <Link href="/accettazione" 
      className="group flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-slate-200 text-slate-600 rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all hover:border-blue-600 hover:text-blue-600"
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

      {/* GRID INFERIORE ALLINEATA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        
        {/* COLONNA SINISTRA: ULTIME LAVORAZIONI */}
        <div className="lg:col-span-2 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
              <Car size={16} className="text-blue-600" /> Ultime Lavorazioni
            </h3>
            <Link href="/lavorazione" className="text-blue-600 text-[10px] font-black uppercase tracking-widest hover:underline">
              Vedi tutto
            </Link>
          </div>

          {/* Contenitore flessibile che occupa tutta l'altezza disponibile */}
          <div className="flex-grow">
            {inOfficina === 0 ? (
              <div className="h-full bg-white rounded-2xl border border-slate-200 border-dashed flex items-center justify-center text-slate-400 p-8">
                <p className="font-bold italic text-sm">Nessun lavoro attivo al momento</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
                {lavoriRecenti.map(task => (
                  <div key={task.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-blue-200 transition-all flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-tighter">
                            {task.targa}
                          </span>
                          {task.priorita === 'Alta' && <AlertTriangle size={14} className="text-red-500" />}
                        </div>
                        <h4 className="text-sm font-bold text-slate-800 uppercase truncate mb-1">{task.modello}</h4>
                        <div className="flex items-center gap-2 text-slate-400">
                          <User size={12} />
                          <span className="text-[10px] font-medium uppercase tracking-tight">{task.cliente}</span>
                        </div>
                      </div>
                      <div className="pt-3 mt-4 border-t border-slate-50 flex justify-between items-center">
                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{task.status}</span>
                        <Link href="/lavorazione" className="text-slate-300 hover:text-blue-600 transition-colors">
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* COLONNA DESTRA: STATO OFFICINA (H-FULL per pareggiare) */}
        <div className="flex flex-col">
          <div className="h-full bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-slate-400">
                <Activity size={16} />
                <h4 className="font-black uppercase text-[10px] tracking-widest">Carico Lavoro</h4>
              </div>
              <span className="text-xl font-black text-slate-800 leading-none">{percentuale}%</span>
            </div>
            
            <div className="h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
              <div 
                className={`h-full transition-all duration-1000 ease-out ${
                  percentuale > 80 ? 'bg-red-500' : 'bg-blue-600'
                }`}
                style={{ width: `${percentuale}%` }}
              />
            </div>
            
            <p className="mt-4 text-[10px] text-slate-400 italic">
              {percentuale > 80 ? 'Officina quasi satura' : 'Capacità ottimale'}
            </p>

            {/* Spinge il tasto Archivio sul fondo della card */}
            <div className="mt-auto pt-8">
              <Link href="/consegnate" className="flex items-center justify-between group p-4 bg-slate-50 rounded-xl hover:bg-green-50 transition-all border border-transparent hover:border-green-100">
                  <div className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-green-600" />
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Vai all'Archivio</span>
                  </div>
                  <ArrowRight size={14} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
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
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg border ${colors[color]}`}>
          {icon}
        </div>
        <span className="text-2xl font-black text-slate-800 italic tracking-tighter">{value}</span>
      </div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
    </div>
  );
}