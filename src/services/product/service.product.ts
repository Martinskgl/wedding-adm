import { prisma } from "@/lib/prisma";

export async function getAllProducts() {
  return await prisma.product.findMany({
    select: {
      uuid: true,
      name: true,
      image: true,
      price: true,
      slug: true,
    },
    orderBy: { name: "asc" },
  });
}

export async function getProductBySlug(slug: string) {
  return await prisma.product.findUnique({
    where: { slug },
    select: {
      name: true,
      description: true,
      price: true,
      image: true,
      slug: true,
      isActive: true,
    },
  });
}

export async function createProduct(data: {
  name: string;
  description: string;
  price: number;
  image: string;
  isActive: boolean;
  slug: string;
}) {
  return await prisma.product.create({ data });
}

export async function editProductBySlug(
  currentSlug: string,
  data: {
    name: string;
    description: string;
    price: number;
    image: string;
    isActive: boolean;
    slug: string;
  }
) {
  return await prisma.product.update({ where: { slug: currentSlug }, data });
}

export async function deleteProductBySlug(slug: string) {
  return await prisma.product.delete({ where: { slug } });
}
