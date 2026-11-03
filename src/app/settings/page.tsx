import { auth } from "@/auth";
import { redirect } from "next/navigation";
import DeleteAccountButton from "@/components/DeleteAccountButton";
import SignOutButton from "@/components/sign-out-button";
export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="max-w-3xl min-h-full space-y-8 text-main-white">
      <h1 className="text-2xl font-bold">Ustawienia konta</h1>
      <SignOutButton />
      <div className="bg-red-950/20 border border-red-900/40 rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-red-400">Usuwanie konta</h2>
        <p className="text-sm text-slate-300">
          Trwałe usunięcie konta i powiązanych z nim danych.
        </p>
        <DeleteAccountButton />
      </div>
    </div>
  );
}
