import { prisma } from "@/lib/prisma";
import ConsegnatiClient from "./ConsegnatiClient";

export const revalidate = 0; // Aggiorna i dati in tempo reale ad ogni ingresso

export default async function ConsegnatiPage() {
  // Recuperiamo tutti i record archiviati (Consegnati)
  const tasks = await prisma.task.findMany({
    where: {
      status: "Consegnato"
    },
    orderBy: {
      dataIngresso: 'desc' // I più recenti in alto
    }
  });

  return <ConsegnatiClient initialTasks={JSON.parse(JSON.stringify(tasks))} />;
}