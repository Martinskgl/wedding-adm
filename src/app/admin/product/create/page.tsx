import Link from "next/link";
import { create } from "@/actions/action.product";
import ProductCreateFormClient from "./ProductFormClient";

export default async function ProductCreatePage({ searchParams }: {
  searchParams: Promise<{ success?: string }>;
}) {
  const { success } = await searchParams;

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <Link href="/admin/product" className="flex items-center justify-center w-8 h-8 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Novo produto</h1>
          <p className="text-xs text-slate-500">Preencha os dados para adicionar um produto.</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <form action={create}>
          <div className="p-6">
            <ProductCreateFormClient showSuccess={success === "true"} />
          </div>
          <div className="flex items-center justify-end gap-2 border-t border-slate-100 px-6 py-4">
            <Link href="/admin/product" className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">
              Cancelar
            </Link>
            <button type="submit" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 transition-colors">
              Criar produto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
