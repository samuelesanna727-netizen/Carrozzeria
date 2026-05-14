export type TaskStatus = 'Preventivo' | 'In Corso' | 'Verniciatura' | 'Pronto';
export type Priority = 'Bassa' | 'Media' | 'Alta';

export interface Task {
  id: string;
  cliente: string;
  targa: string;
  modello: string;
  descrizione: string;
  status: TaskStatus;
  priorita: Priority;
  createdAt: string;
}