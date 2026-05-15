import { prisma } from "@/lib/prisma";
import LavorazioneClient from "./LavorazioneClient"; 

export const revalidate = 0; // Forza l'aggiornamento dei dati a ogni visita

export default async function LavorazionePage() {
  // Ora prendiamo solo i veicoli che hanno lo stato "In Corso"
  // Abbiamo rimosso il filtro OR che includeva la Verniciatura
  const tasks = await prisma.task.findMany({
    where: {
      status: "In Corso"
    },
    orderBy: {
      priorita: 'desc' // Le emergenze (priorità Alta) restano in cima
    }
  });

  return <LavorazioneClient initialTasks={JSON.parse(JSON.stringify(tasks))} />;
}