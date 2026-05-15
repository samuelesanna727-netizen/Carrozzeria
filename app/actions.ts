"use server"

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// --- AZIONE PER LA PAGINA ACCETTAZIONE ---
export async function createVehicle(formData: any) {
  try {
    await prisma.task.create({
      data: {
        cliente: formData.cliente,
        targa: formData.targa,
        modello: formData.modello,
        descrizione: formData.descrizione,
        priorita: formData.priorita,
        categoria: formData.categoria,
        status: "In Corso",
      },
    });
    
    revalidatePath("/");
    revalidatePath("/lavorazione");
  } catch (error) {
    console.error("Errore creazione veicolo:", error);
    throw new Error("Errore nel database");
  }
  
  // Reindirizziamo alla dashboard dopo il salvataggio
  redirect("/");
}

// --- AZIONI PER LA PAGINA LAVORAZIONE ---
export async function updateTaskStatus(id: string, newStatus: string) {
  try {
    await prisma.task.update({
      where: { id },
      data: { status: newStatus },
    });
    revalidatePath("/lavorazione");
    revalidatePath("/");
  } catch (error) {
    console.error("Errore aggiornamento status:", error);
  }
}

export async function updateTaskDetails(id: string, description: string) {
  try {
    await prisma.task.update({
      where: { id },
      data: { descrizione: description },
    });
    revalidatePath("/lavorazione");
  } catch (error) {
    console.error("Errore aggiornamento dettagli:", error);
  }
}

export async function deleteTask(id: string) {
  try {
    await prisma.task.delete({
      where: { id },
    });
    revalidatePath("/lavorazione");
    revalidatePath("/");
  } catch (error) {
    console.error("Errore eliminazione task:", error);
  }
}