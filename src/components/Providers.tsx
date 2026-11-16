"use client";

import { SessionProvider } from "next-auth/react";
import ThemeHydrator from "./ThemeHydrator";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeHydrator />
      {children}
    </SessionProvider>
  );
}
