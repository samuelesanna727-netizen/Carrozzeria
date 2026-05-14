"use client";

import { useTasks } from "./context/TaskContext";
import { 
  Car, Wrench, AlertTriangle, CheckCircle, 
  ArrowRight, Plus, Activity, Clock 
} from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const { tasks } = useTasks();

  const inOfficina = tasks.filter(t => t.status !== 'Consegnato').length;
  const urgenze = tasks.filter(t => t.priorita === 'Alta' && t.status !== 'Consegnato').length;
  const pronti = tasks.filter(t => t.status === 'Consegnato').length;
  const totaleTask = tasks.length;

  const capMax = 10;
  const percentuale = Math.min(Math.round((inOfficina / capMax) * 100), 100);

  return (
    <div className="p-8 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      
      {/* HEADER - PULITO E DIRETTO */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic">
            PANNELLO <span className="text-blue-600 not-italic">CONTROLLO</span>
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Samuele Pro Auto • Dashboard</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white border border-slate-200 px-5 py-2.5 rounded-xl shadow-sm">
            <p className="font-black text-slate-900 uppercase text-xs">Giovedì 14 Maggio</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 transition-all text-white px-6 py-3 rounded-xl font-black uppercase text-xs flex items-center gap-2 shadow-lg shadow-blue-100">
            <Plus size={18} strokeWidth={3} /> Nuova Entrata
          </button>
        </div>
      </div>

      {/* STATS GRID - RADIUS RIDOTTO */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="In Officina" value={inOfficina} icon={<Wrench size={20}/>} color="blue" />
        <StatCard label="Urgenze" value={urgenze} icon={<AlertTriangle size={20}/>} color="red" />
        <StatCard label="Pronti" value={pronti} icon={<CheckCircle size={20}/>} color="green" />
        <StatCard label="Totale Task" value={totaleTask} icon={<Clock size={20}/>} color="slate" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* MAIN VIEW: TABELLA RAPIDA VEICOLI */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <div className="flex justify-between items-center mb-8 border-b border-slate-50 pb-5">
            <h3 className="text-xl font-black text-slate-900 uppercase italic flex items-center gap-3">
              <Car className="text-blue-600" size={24} /> Veicoli Attivi
            </h3>
            <Link href="/lavorazione" className="bg-slate-50 hover:bg-slate-100 p-2 rounded-lg transition-colors">
              <ArrowRight size={18} className="text-slate-400" />
            </Link>
          </div>

          {inOfficina === 0 ? (
            <div className="py-20 text-center">
               <p className="text-slate-300 font-black uppercase tracking-widest text-sm italic">Nessun lavoro in corso</p>
            </div>
          ) : (
            <div className="space-y-2">
               {/* Qui i veicoli avranno un design più compatto e squadrato */}
               <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">Monitoraggio in tempo reale attivo</p>
            </div>
          )}
        </div>

        {/* SIDEBAR - OCCUPAZIONE */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Activity className="text-blue-600" size={20} />
                <h4 className="font-black text-slate-900 uppercase italic text-sm">Stato Officina</h4>
              </div>
              <span className="text-2xl font-black text-slate-900">{percentuale}%</span>
            </div>
            
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-700 ${
                  percentuale > 80 ? 'bg-red-500' : 'bg-blue-600'
                }`}
                style={{ width: `${percentuale}%` }}
              />
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-50">
               <Link href="/consegnate" className="flex items-center justify-between group">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-blue-600 transition-colors">Vedi Archivio Consegnati</span>
                  <ArrowRight size={14} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
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
    blue: "text-blue-600 bg-blue-50",
    red: "text-red-600 bg-red-50",
    green: "text-green-600 bg-green-50",
    slate: "text-slate-600 bg-slate-50",
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-blue-300 transition-all">
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <span className="text-4xl font-black text-slate-900 tracking-tighter italic italic">{value}</span>
      </div>
      <div className={`p-4 rounded-xl ${colors[color]}`}>
        {icon}
      </div>
    </div>
  );
}