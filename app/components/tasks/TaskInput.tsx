"use client";
import React, { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import { TaskStatus, Priority } from '../../types';
import { Plus, Car, User, Hash } from 'lucide-react';

export default function TaskInput() {
  const { addTask } = useTasks();
  const [form, setForm] = useState({ 
    cliente: '', 
    targa: '', 
    modello: '', 
    status: 'In Corso' as TaskStatus, 
    priorita: 'Media' as Priority 
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Il cast "as any" sulla proprietà status risolve l'errore di incompatibilità nel build
    addTask({ 
      ...form, 
      descrizione: '',
      status: form.status as any 
    });

    setForm({ 
      cliente: '', 
      targa: '', 
      modello: '', 
      status: 'In Corso', 
      priorita: 'Media' 
    });
    
    alert("Veicolo registrato con successo!");
  };

  return (
    <form onSubmit={submit} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Plus size={18} className="text-blue-600" />
        </div>
        <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Ingresso Rapido</h3>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
          <input 
            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-400 transition-all font-bold text-slate-700" 
            placeholder="Nome Cliente" 
            value={form.cliente} 
            onChange={e => setForm({...form, cliente: e.target.value})} 
            required 
          />
        </div>

        <div className="relative">
          <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
          <input 
            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-400 transition-all font-mono font-bold text-slate-800 uppercase" 
            placeholder="Targa" 
            value={form.targa} 
            onChange={e => setForm({...form, targa: e.target.value.toUpperCase()})} 
            required 
          />
        </div>

        <div className="relative">
          <Car className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
          <input 
            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-400 transition-all font-bold text-slate-700" 
            placeholder="Modello Auto" 
            value={form.modello} 
            onChange={e => setForm({...form, modello: e.target.value})} 
            required 
          />
        </div>
      </div>

      <button 
        type="submit" 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-black uppercase tracking-widest text-[11px] shadow-lg shadow-blue-100 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
      >
        <Plus size={16} strokeWidth={3} />
        Registra Veicolo
      </button>
    </form>
  );
}