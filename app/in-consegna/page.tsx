import { prisma } from "@/lib/prisma";
import InConsegnaClient from "./InConsegnaClient";

export const revalidate = 0;

export default async function InConsegnaPage() {
  // Recuperiamo solo i veicoli pronti per la consegna
  const tasks = await prisma.task.findMany({
    where: {
      status: "In Consegna"
    },
    orderBy: {
      priorita: 'desc'
    }
  });

  return <InConsegnaClient initialTasks={JSON.parse(JSON.stringify(tasks))} />;
}