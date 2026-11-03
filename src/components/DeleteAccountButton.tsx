"use client";

import { useTransition } from "react";
import { deleteAccount } from "@/actions/auth";

export default function DeleteAccountButton() {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (
      confirm(
        "Czy na pewno chcesz usunąć konto? Cały proces jest nieodwracalny."
      )
    ) {
      startTransition(async () => {
        await deleteAccount();
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-main-white font-semibold text-sm rounded-xl transition-all disabled:opacity-50 cursor-pointer"
    >
      {isPending ? "Usuwanie..." : "Usuń konto"}
    </button>
  );
}
