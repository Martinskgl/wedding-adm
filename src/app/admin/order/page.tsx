import { getAllTransaction } from "@/services/transaction/service.transaction";
import TransactionClient from "./TransactionClient";

export default async function OrderPage() {
  const raw = await getAllTransaction();
  const transactions = raw.map((t) => ({
    uuid: t.uuid,
    quantity: t.quantity,
    totalPrice: t.totalPrice.toString(),
    status: t.status,
    createdAt: t.createdAt.toISOString(),
    customer: t.customer,
    product: t.product,
  }));
  return <TransactionClient transactions={transactions} />;
}
