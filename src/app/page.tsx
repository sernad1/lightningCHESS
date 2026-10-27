"use client";

import Link from "next/link";
import RegisterForm from "@/components/RegisterForm";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <RegisterForm
        onSuccess={() => {
          alert("Konto zostało utworzone! Możesz się teraz zalogować.");
        }}
        onSwitchToLogin={() => {
          alert(
            "Tu w przyszłości podepniecie formularz logowania napisany przez koleżankę."
          );
        }}
      />
    </main>
  );
}
