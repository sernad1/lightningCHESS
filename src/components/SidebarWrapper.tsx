"use client";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
const hiddenRoutes = ["/", "/login", "/register"]; // lista de ne maje buty sidebaru

export default function SidebarWrapper() {
  const pathname = usePathname();

  if (hiddenRoutes.includes(pathname)) {
    return null;
  }
  return <Sidebar />;
}
