"use client";
import { DashboardNavbar } from "@/components/shared/dashboard/DashboardNavbar";
import { Toaster } from "@/components/ui/toaster";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const isLoginPage = pathName === "/dashboard/login";
  return (
    <main>
      {!isLoginPage && <DashboardNavbar />}
      {children}
      <Toaster />
    </main>
  );
}
