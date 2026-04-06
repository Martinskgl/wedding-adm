"use server";

import { updateTransactionStatus, deleteTransactionByUuid } from "@/services/transaction/service.transaction";
import { revalidatePath } from "next/cache";

const VALID_STATUSES = ["PENDING", "PAID", "FAILED", "CANCELLED"];

export async function updateStatus(formData: FormData) {
  const uuid = formData.get("uuid") as string;
  const status = formData.get("status") as string;

  if (!uuid || !VALID_STATUSES.includes(status)) throw new Error("Dados inválidos");

  await updateTransactionStatus(uuid, status);
  revalidatePath("/admin/order");
}

export async function deleteTransaction(formData: FormData) {
  const uuid = formData.get("uuid") as string;
  if (!uuid) throw new Error("UUID não encontrado");

  await deleteTransactionByUuid(uuid);
  revalidatePath("/admin/order");
}
