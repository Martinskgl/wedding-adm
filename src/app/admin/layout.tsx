import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { Inter } from "next/font/google";
import AdminSidebarLink from "@/components/common/AdminSidebarLink";
import SignOutButton from "@/components/common/SignOutButton";

const inter = Inter({ subsets: ["latin"] });

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${inter.className} flex flex-col md:flex-row min-h-screen bg-slate-50`}>

      {/* Sidebar */}
      <aside className="flex flex-row md:flex-col w-full md:w-56 shrink-0 bg-slate-900 md:min-h-screen">

        {/* Brand */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5 md:flex-col md:items-center md:gap-2 md:px-5 md:py-7">
          {/* Substitua pelo logo do seu projeto */}
          <span className="text-white font-bold text-lg md:text-xl">Admin</span>
          <span className="hidden md:block text-[11px] font-bold tracking-widest text-slate-500 uppercase">
            Painel Admin
          </span>
        </div>

        {/* Nav */}
        <nav className="flex flex-row md:flex-col flex-1 gap-1 px-2 py-2 md:px-3 md:py-4 overflow-x-auto">
          <AdminSidebarLink href="/admin">
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard
          </AdminSidebarLink>
          <AdminSidebarLink href="/admin/product">
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            Produtos
          </AdminSidebarLink>
          <AdminSidebarLink href="/admin/order">
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Pedidos
          </AdminSidebarLink>
        </nav>

        {/* Footer — desktop */}
        <div className="hidden md:flex flex-col gap-1 px-3 py-5 border-t border-white/5">
          <SignOutButton />
          <p className="text-center text-[10px] text-slate-700 mt-2">
            &copy; {new Date().getFullYear()} Admin Panel
          </p>
        </div>

        {/* Sign out — mobile */}
        <div className="flex items-center md:hidden px-2 py-2 border-l border-white/5 shrink-0">
          <SignOutButton />
        </div>

      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 p-4 md:p-8 lg:p-10">
        <Toaster position="top-center" richColors />
        <div className="mx-auto max-w-4xl">
          {children}
        </div>
      </main>

    </div>
  );
}
