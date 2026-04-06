"use client";

import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { generateSlug } from "@/lib/utils";

interface ProductForm {
  name: string;
  description: string | null;
  price: string;
  image: string | null;
  slug: string;
  isActive: boolean;
}

function formatPrice(digits: string): string {
  const number = parseInt(digits || "0", 10) / 100;
  return number.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function toRawPrice(formatted: string): string {
  return formatted.replace(/\./g, "").replace(",", ".");
}

function initPrice(raw: string): string {
  const number = parseFloat(raw || "0");
  return isNaN(number) ? "0,00" : number.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function ProductFormClient({ product, showSuccess }: { product: ProductForm; showSuccess: boolean }) {
  const [name, setName] = useState(product.name);
  const [slug, setSlug] = useState(product.slug);
  const [price, setPrice] = useState(() => initPrice(product.price));

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
    setSlug(generateSlug(e.target.value));
  }

  function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value.replace(/\D/g, "");
    setPrice(formatPrice(digits));
  }

  useEffect(() => {
    if (showSuccess) toast.success("Produto atualizado com sucesso!", { duration: 4000 });
  }, [showSuccess]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Nome *</label>
        <Input name="name" value={name} onChange={handleNameChange} required />
      </div>

      <div>
        <input type="hidden" name="originalSlug" value={product.slug} />
        <label className="block text-sm font-medium text-slate-700 mb-1">Slug</label>
        <Input value={slug} readOnly name="slug" className="bg-gray-100 text-gray-400 cursor-not-allowed" />
        <p className="text-xs text-gray-400 mt-1">Gerado automaticamente pelo nome.</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Preço *</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 select-none">R$</span>
          <Input value={price} onChange={handlePriceChange} className="pl-9" inputMode="numeric" />
        </div>
        <input type="hidden" name="price" value={toRawPrice(price)} />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Imagem (URL)</label>
        <Input name="image" defaultValue={product.image ?? ""} type="url" />
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-slate-700 mb-1">Descrição</label>
        <textarea name="description" defaultValue={product.description ?? ""} className="w-full rounded-lg border border-slate-200 bg-transparent px-3 py-2 text-sm outline-none min-h-[80px]" />
      </div>

      <div className="flex items-center gap-2 md:col-span-2">
        <input type="checkbox" name="isActive" defaultChecked={product.isActive} id="isActive" className="accent-slate-900" />
        <label htmlFor="isActive" className="text-sm text-slate-700">Ativo</label>
      </div>
    </div>
  );
}
