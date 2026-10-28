"use client";

import { signup } from "@/actions/auth";
import React, { useActionState, useState } from "react";

export default function RegisterForm() {
  const [state, formData, isPending] = useActionState(signup, undefined);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          LightningChess
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Utwórz nowe konto i dołącz do gry
        </p>
      </div>


      <form action={formData} className="space-y-4">
        <div>
          <label htmlFor="username"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            Nazwa użytkownika
          </label>
          <input id="username" name="username" type="text" placeholder="np. Szachmistrz99" value={username}
            onChange={(e) => setUsername(e.target.value)} required
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"/>
        </div>

        <div>
          <label htmlFor="email"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            Adres e-mail
          </label>
          <input id="email" name="email" type="email" placeholder="gracz@lightningchess.pl" value={email}
            onChange={(e) => setEmail(e.target.value)} required
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label htmlFor="password"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            Hasło
          </label>
          <input id="password" name="password" type="password" placeholder="••••••••" value={password}
            onChange={(e) => setPassword(e.target.value)} required
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            Powtórz hasło
          </label>
          <input id="confirmPassword" name="confirmPassword" type="password" placeholder="••••••••" value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} required
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          />
        </div>

        <button type="submit" disabled={isPending}
          className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 active:bg-orange-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-xl transition-all shadow-md shadow-orange-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Rejestrowanie..." : "Zarejestruj się"}
        </button>
        <p>{state?.error}</p>
      </form>
    </div>
  );
}
