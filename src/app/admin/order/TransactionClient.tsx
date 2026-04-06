"use client";

import { useState } from "react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { updateStatus, deleteTransaction } from "@/actions/action.transaction";

interface Transaction {
  uuid: string;
  quantity: number;
  totalPrice: string;
  status: string;
  createdAt: string;
  customer: { name: string };
  product: { name: string };
}

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Pendente",
  PAID: "Pago",
  FAILED: "Falhou",
  CANCELLED: "Cancelado",
};

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  PAID: "bg-green-100 text-green-700",
  FAILED: "bg-red-100 text-red-700",
  CANCELLED: "bg-slate-100 text-slate-500",
};

export default function TransactionClient({ transactions }: { transactions: Transaction[] }) {
  const [confirmDelete, setConfirmDelete] = useState<Transaction | null>(null);

  return (
    <div>

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white shadow-2xl p-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-50 mx-auto mb-4">
              <FontAwesomeIcon icon={faTrash} className="text-red-500 w-5 h-5" />
            </div>
            <h2 className="text-base font-semibold text-slate-900 text-center mb-1">Deletar pedido?</h2>
            <p className="text-sm text-slate-500 text-center mb-6">
              Pedido de <strong className="text-slate-700">{confirmDelete.customer.name}</strong> será removido permanentemente.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 rounded-lg border border-slate-200 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <form action={deleteTransaction} className="flex-1">
                <input type="hidden" name="uuid" value={confirmDelete.uuid} />
                <button type="submit" className="w-full rounded-lg bg-red-500 py-2 text-sm font-semibold text-white hover:bg-red-600 transition-colors">
                  Deletar
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Pedidos</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          {transactions.length} {transactions.length === 1 ? "pedido" : "pedidos"}
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50">
              <TableHead className="pl-4">Cliente</TableHead>
              <TableHead>Produto</TableHead>
              <TableHead className="text-right">Qtd.</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Status</TableHead>
              <TableHead className="text-right pr-4 w-16">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-16 text-center text-sm text-slate-400">
                  Nenhum pedido encontrado.
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((transaction) => (
                <TableRow key={transaction.uuid} className="hover:bg-slate-50/50">
                  <TableCell className="pl-4 font-medium text-slate-900">{transaction.customer.name}</TableCell>
                  <TableCell className="text-slate-600">{transaction.product.name}</TableCell>
                  <TableCell className="text-right text-slate-600">{transaction.quantity}</TableCell>
                  <TableCell className="text-right font-semibold text-slate-700">
                    {Number(transaction.totalPrice).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </TableCell>
                  <TableCell className="text-right">
                    <form action={updateStatus}>
                      <input type="hidden" name="uuid" value={transaction.uuid} />
                      <select
                        name="status"
                        defaultValue={transaction.status}
                        onChange={(e) => e.currentTarget.form?.requestSubmit()}
                        className={`rounded-md border border-slate-200 px-2 py-1 text-xs font-medium cursor-pointer focus:outline-none ${STATUS_COLORS[transaction.status] ?? ""}`}
                      >
                        {Object.entries(STATUS_LABELS).map(([value, label]) => (
                          <option key={value} value={value}>{label}</option>
                        ))}
                      </select>
                    </form>
                  </TableCell>
                  <TableCell className="text-right pr-4">
                    <button
                      type="button"
                      title="Deletar pedido"
                      onClick={() => setConfirmDelete(transaction)}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-red-100 text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      <FontAwesomeIcon icon={faTrash} className="w-3.5 h-3.5" />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
