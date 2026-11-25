import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/auth.config";

export const ADMIN_ROLE = "ADMIN";

/**
 * Garante que existe uma sessão de administrador.
 * Redireciona para /login caso contrário. Use em layouts, páginas e server actions.
 */
export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== ADMIN_ROLE) {
    redirect("/login");
  }
  return session;
}
