"use client";
import React, { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import { TaskStatus, Priority } from '../../types';

export default function TaskInput() {
  const { addTask } = useTasks();
  const [form, setForm] = useState({ cliente: '', targa: '', modello: '', status: 'In Corso' as TaskStatus, priorita: 'Media' as Priority });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask({ ...form, descrizione: '' });
    setForm({ cliente: '', targa: '', modello: '', status: 'In Corso', priorita: 'Media' });
    alert("Auto registrata!");
  };

  return (
    <form onSubmit={submit} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
      <h3 className="font-black uppercase italic text-blue-600">Nuova Accettazione</h3>
      <input className="w-full p-3 border rounded-xl" placeholder="Cliente" value={form.cliente} onChange={e => setForm({...form, cliente: e.target.value})} required />
      <input className="w-full p-3 border rounded-xl uppercase" placeholder="Targa" value={form.targa} onChange={e => setForm({...form, targa: e.target.value})} required />
      <input className="w-full p-3 border rounded-xl" placeholder="Modello Auto" value={form.modello} onChange={e => setForm({...form, modello: e.target.value})} required />
      <button type="submit" className="w-full bg-blue-600 text-white p-4 rounded-xl font-black uppercase tracking-widest">Registra Auto</button>
    </form>
  );
}