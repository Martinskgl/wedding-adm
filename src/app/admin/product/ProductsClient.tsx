"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { deleteProduct } from "@/actions/action.product";

interface Product {
  uuid: string;
  name: string;
  price: string;
  image: string | null;
  slug: string;
}

export default function ProductsClient({ products, success, deleted }: {
  products: Product[];
  success?: string;
  deleted?: string;
}) {
  const [confirmDelete, setConfirmDelete] = useState<Product | null>(null);

  useEffect(() => {
    if (success === "true") toast.success("Produto criado com sucesso!", { duration: 4000 });
    if (deleted === "true") toast.success("Produto deletado com sucesso!", { duration: 4000 });
  }, [success, deleted]);

  return (
    <div>

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white shadow-2xl p-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-50 mx-auto mb-4">
              <FontAwesomeIcon icon={faTrash} className="text-red-500 w-5 h-5" />
            </div>
            <h2 className="text-base font-semibold text-slate-900 text-center mb-1">Deletar produto?</h2>
            <p className="text-sm text-slate-500 text-center mb-6">
              <strong className="text-slate-700">{confirmDelete.name}</strong> será removido permanentemente.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 rounded-lg border border-slate-200 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <form action={deleteProduct} className="flex-1">
                <input type="hidden" name="slug" value={confirmDelete.slug} />
                <button type="submit" className="w-full rounded-lg bg-red-500 py-2 text-sm font-semibold text-white hover:bg-red-600 transition-colors">
                  Deletar
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Produtos</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {products.length} {products.length === 1 ? "produto" : "produtos"} cadastrado{products.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/admin/product/create"
          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Novo produto
        </Link>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50">
              <TableHead className="w-16 pl-4">Foto</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead className="text-right">Preço</TableHead>
              <TableHead className="text-right pr-4 w-24">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="py-16 text-center text-sm text-slate-400">
                  Nenhum produto cadastrado.
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.slug} className="hover:bg-slate-50/50">
                  <TableCell className="pl-4">
                    <div className="w-11 h-11 rounded-lg border border-slate-100 bg-slate-50 overflow-hidden">
                      {product.image ? (
                        <Image src={product.image} alt={product.name} width={44} height={44} className="object-cover w-full h-full" />
                      ) : (
                        <div className="flex h-full items-center justify-center text-slate-300">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-slate-900">{product.name}</TableCell>
                  <TableCell className="text-right font-semibold text-slate-700">
                    {Number(product.price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </TableCell>
                  <TableCell className="text-right pr-4">
                    <div className="flex justify-end gap-1">
                      <Link
                        href={`/admin/product/${product.slug}/edit`}
                        title="Editar"
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                      >
                        <FontAwesomeIcon icon={faPen} className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        type="button"
                        title="Deletar"
                        onClick={() => setConfirmDelete(product)}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-red-100 text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
                        <FontAwesomeIcon icon={faTrash} className="w-3.5 h-3.5" />
                      </button>
                    </div>
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
