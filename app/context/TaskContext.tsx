"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Task = {
  id: string;
  cliente: string;
  targa: string;
  modello: string;
  descrizione: string;
  priorita: "Bassa" | "Media" | "Alta";
  status: "In Corso" | "Verniciatura" | "Consegnato";
  dataIngresso: string;
};

type TaskContextType = {
  tasks: Task[];
  searchQuery: string; // <-- AGGIUNTO
  setSearchQuery: (query: string) => void; // <-- AGGIUNTO
  addTask: (task: Omit<Task, "id" | "dataIngresso">) => void;
  updateTask: (id: string, newStatus: Task["status"]) => void;
  deleteTask: (id: string) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState(""); // <-- AGGIUNTO: Stato per la ricerca

  // Caricamento iniziale
  useEffect(() => {
    const saved = localStorage.getItem("carrozzeria_tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  // Salvataggio automatico
  useEffect(() => {
    localStorage.setItem("carrozzeria_tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskData: Omit<Task, "id" | "dataIngresso">) => {
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(36).substr(2, 9),
      dataIngresso: new Date().toLocaleDateString("it-IT"),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const updateTask = (id: string, newStatus: Task["status"]) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    // Aggiunti searchQuery e setSearchQuery nel value del Provider
    <TaskContext.Provider value={{ 
      tasks, 
      searchQuery, 
      setSearchQuery, 
      addTask, 
      updateTask, 
      deleteTask 
    }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within a TaskProvider");
  return context;
};