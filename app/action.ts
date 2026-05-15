"use server"
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addVehicle(data: {
  cliente: string,
  targa: string,
  modello: string,
  descrizione: string,
  priorita: string,
  categoria: string
}) {
  await prisma.task.create({
    data: {
      ...data,
      status: "In Corso", // Stato iniziale predefinito
    },
  });

  // Questo comando dice a Next.js di aggiornare la pagina per mostrare i nuovi dati
  revalidatePath("/"); 
}