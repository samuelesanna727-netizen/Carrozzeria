import { prisma } from "@/lib/prisma";
import { 
  ArrowRight, Activity, Plus, ListFilter
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

// Questa riga assicura che i dati siano sempre freschi dal DB
export const revalidate = 0;

export default async function Dashboard() {
  // 1. RECUPERO DATI DAL DATABASE (LATO SERVER)
  const tasks = await prisma.task.findMany({
    orderBy: {
      dataIngresso: 'desc'
    }
  });

  // 2. CALCOLI STATISTICHE
  const inOfficina = tasks.filter(t => t.status !== 'Consegnato').length;
  const urgenze = tasks.filter(t => t.priorita === 'Alta' && t.status !== 'Consegnato').length;
  const pronti = tasks.filter(t => t.status === 'Consegnato').length;
  const lavoriRecenti = tasks.filter(t => t.status !== 'Consegnato').slice(0, 5);
  
  const capMax = 20;
  const percentuale = Math.min(Math.round((inOfficina / capMax) * 100), 100);

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 lg:p-10 font-sans tracking-tight text-slate-900">
      <div className="max-w-[1400px] mx-auto">
        
        {/* HEADER */}
        <div className="flex items-end justify-between mb-12 border-b border-slate-200 pb-8">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Gestione <span className="text-blue-600 font-medium">Officina</span>
            </h1>
            <p className="text-sm text-slate-400 mt-1 font-medium">Database SQLite Locale</p>
          </div>

          <Link href="/accettazione" 
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-lg font-medium text-sm transition-all hover:bg-slate-800 active:scale-95 shadow-sm"
          >
            <Plus size={16} />
            Nuovo Ingresso
          </Link>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatMini label="Mezzi in corso" value={inOfficina} />
          <StatMini label="Urgenze attive" value={urgenze} highlight={urgenze > 0} />
          <StatMini label="Lavori completati" value={pronti} />
          <StatMini label="Capacità impiegata" value={`${percentuale}%`} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LISTA LAVORI DAL DATABASE */}
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 mb-6">
              <ListFilter size={16} className="text-slate-400" />
              <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400">Recenti</h3>
            </div>

            <div className="space-y-4">
              {lavoriRecenti.length > 0 ? lavoriRecenti.map(task => (
                <div key={task.id} className="group bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm flex items-center justify-between transition-all hover:shadow-md hover:border-slate-300">
                  <div className="flex items-center gap-6">
                    <div className={`w-1.5 h-10 rounded-full transition-colors ${task.priorita === 'Alta' ? 'bg-red-500' : 'bg-slate-100 group-hover:bg-blue-500'}`} />
                    <div>
                      <div className="flex items-center gap-3 mb-0.5">
                        <span className="text-[11px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100 uppercase">
                          {task.targa}
                        </span>
                        <h4 className="text-[15px] font-semibold text-slate-800 uppercase tracking-tight">{task.modello}</h4>
                      </div>
                      <span className="text-xs text-slate-400">{task.cliente}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-8">
                    <div className="hidden sm:block text-right">
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${task.priorita === 'Alta' ? 'text-red-500' : 'text-blue-600'}`}>
                        {task.status}
                      </span>
                    </div>
                    <Link href={`/lavorazione/${task.id}`} className="text-slate-300 hover:text-slate-900 transition-colors">
                      <ArrowRight size={20} />
                    </Link>
                  </div>
                </div>
              )) : (
                <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-2xl">
                  <p className="text-slate-400">Nessun veicolo registrato nel database.</p>
                  <Link href="/accettazione" className="text-blue-500 text-sm font-medium mt-2 inline-block">Registra il primo mezzo →</Link>
                </div>
              )}
            </div>
          </div>

          {/* BARRA LATERALE */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h4 className="text-sm font-semibold text-slate-900">Stato Officina</h4>
                <Activity size={18} className="text-blue-500" />
              </div>
              
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-light text-slate-900 tracking-tighter">{percentuale}%</span>
                <span className="text-xs font-medium text-slate-400 uppercase">Occupazione</span>
              </div>

              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-8">
                <div 
                  className={`h-full transition-all duration-1000 rounded-full ${percentuale > 80 ? 'bg-orange-500' : 'bg-slate-900'}`}
                  style={{ width: `${percentuale}%` }}
                />
              </div>

              <div className="space-y-3">
                <QuickLink href="/consegnate" label="Archivio Storico" />
                <QuickLink href="/lavorazione" label="Gestione Code" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// COMPONENTI DI SUPPORTO (Nello stesso file)
function StatMini({ label, value, highlight }: any) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <span className={`text-2xl font-semibold tracking-tight ${highlight ? 'text-red-500' : 'text-slate-900'}`}>
        {value}
      </span>
    </div>
  );
}

function QuickLink({ href, label }: any) {
  return (
    <Link href={href} className="flex items-center justify-between p-3.5 bg-slate-50 rounded-lg hover:bg-slate-100 transition-all text-xs font-medium text-slate-600">
      {label}
      <ArrowRight size={14} className="text-slate-300" />
    </Link>
  );
}