"use client";

import { usePathname } from "next/navigation";
import SidebarWrapper from "./SidebarWrapper";

export default function AppLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === "/") {
    return <>{children}</>;
  }
  return (
    <div className="flex h-screen overflow-hidden bg-main-darkest text-main-white">
      <SidebarWrapper />
      <main className="flex-1 overflow-y-auto p-8 bg-black/30">{children}</main>
    </div>
  );
}
