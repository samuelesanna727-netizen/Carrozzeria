"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Car, 
  Wrench, 
  Clock, // Icona per In Consegna
  CheckCircle2, 
  Users, 
  Settings, 
  ChevronLeft, 
  Menu 
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Car, label: "Accettazione", href: "/accettazione" },
  { icon: Wrench, label: "In Lavorazione", href: "/lavorazione" },
  { icon: Clock, label: "In Consegna", href: "/in-consegna" }, // Nuova voce
  { icon: CheckCircle2, label: "Consegnate", href: "/consegnate" },
  { icon: Users, label: "Clienti", href: "/clienti" },
  { icon: Settings, label: "Impostazioni", href: "/impostazioni" },
];

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside 
      className={`fixed lg:static inset-y-0 left-0 z-50 bg-white border-r border-slate-200 transition-all duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-20"
      } flex flex-col h-screen`}
    >
      {/* Header Sidebar */}
      <div className={`p-6 flex items-center ${isOpen ? "justify-between" : "justify-center"}`}>
        {isOpen && (
          <div className="flex items-center gap-2 italic">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white text-sm">
              M
            </div>
            <span className="font-black text-slate-900 tracking-tighter uppercase text-lg">
              Fll. <span className="text-blue-600 font-black italic">Lintas</span>
            </span>
          </div>
        )}
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
        >
          {isOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Navigazione */}
      <nav className="flex-1 px-3 space-y-1 mt-4 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold transition-all ${
                isActive 
                  ? "bg-blue-50 text-blue-600 shadow-sm" 
                  : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"
              } ${!isOpen && "justify-center"}`}
            >
              <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              {isOpen && <span className="whitespace-nowrap">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer Utente */}
      <div className="p-4 border-t border-slate-100">
        <div className={`bg-slate-50 p-3 rounded-xl flex items-center ${isOpen ? "gap-3" : "justify-center"}`}>
          <div className="w-9 h-9 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-black shadow-inner">
            S
          </div>
          {isOpen && (
            <div className="overflow-hidden text-left">
              <p className="text-[10px] font-black text-slate-400 uppercase leading-none">Admin</p>
              <p className="text-sm font-black text-slate-900 truncate tracking-tight">Samuele</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}