"use server";

import { createProduct, editProductBySlug, deleteProductBySlug } from "@/services/product/service.product";
import { generateSlug } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function create(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const image = formData.get("image") as string;
  const isActive = formData.get("isActive") === "on";
  const slug = generateSlug(name);

  await createProduct({ name, description, price, image, isActive, slug });

  revalidatePath("/admin/product");
  redirect("/admin/product?success=true");
}

export async function edit(formData: FormData) {
  const originalSlug = formData.get("originalSlug") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const image = formData.get("image") as string;
  const isActive = formData.get("isActive") === "on";

  if (!originalSlug) throw new Error("Slug não encontrado");

  const newSlug = generateSlug(name);
  await editProductBySlug(originalSlug, { name, description, price, image, isActive, slug: newSlug });

  revalidatePath("/admin/product");
  redirect(`/admin/product/${newSlug}/edit?success=true`);
}

export async function deleteProduct(formData: FormData) {
  const slug = formData.get("slug") as string;
  if (!slug) throw new Error("Slug não encontrado");

  await deleteProductBySlug(slug);

  revalidatePath("/admin/product");
  redirect("/admin/product?deleted=true");
}
