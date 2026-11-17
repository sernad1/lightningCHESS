"use client";

import { useState, useTransition } from "react";
import { updateUsername } from "@/actions/user";
import { StatusMessage } from "@/types/navigation";

interface UsernameFormProps {
  currentUsername: string;
}

export function ChangeNameForm({ currentUsername }: UsernameFormProps) {
  const [username, setUsername] = useState("");
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<StatusMessage | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    startTransition(async () => {
      const res = await updateUsername(username);

      if (!res.success) {
        setMessage({ type: "error", text: res.error ?? "Error." });
        return;
      }

      setUsername(username);
      setMessage({ type: "success", text: "Nazwa użytkownika została zmieniona." });
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
          placeholder={currentUsername} disabled={isPending}
          className="flex-1 px-3.5 py-2 rounded-xl bg-white border border-neutral-400 text-sm text-black placeholder:text-neutral-500 focus:outline-none focus:border-neutral-900 disabled:opacity-50"/>
        <button type="submit" disabled={isPending || !username.trim()}
          className="px-5 py-2 rounded-xl bg-neutral-900 text-white text-sm font-semibold hover:bg-neutral-800 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
          {isPending ? "Zapisywanie..." : "Zapisz"}
        </button>
      </div>

      {message && (
        <p className={`text-xs font-medium ${message.type === "success" ? "text-green-700" : "text-red-700"}`}>
          {message.text}
        </p>
      )}
    </form>
  );
}