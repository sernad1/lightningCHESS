"use client";

import React, { useActionState, useState } from "react";
import GoogleLogin from "./google-login";
import { credentialslogin } from "@/actions/auth";
import Link from "next/link";


export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(credentialslogin, undefined);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  {/* removed loading states, cause they're not necessary */}

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          LightningChess
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Zaloguj się do swojego konta</p>
      </div>

      <GoogleLogin/>

      <div className="relative flex items-center justify-center">
        <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
        <span className="bg-white dark:bg-slate-900 px-3 text-xs text-slate-400 uppercase tracking-wider absolute">
          lub
        </span>
      </div>

      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            Adres E-mail
          </label>
          <input id="email"name="email" type="email"placeholder="twoj@email.com" value={email}
            onChange={(e) => setEmail(e.target.value)} required
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"/>
        </div>

        <div>
          <label htmlFor="password"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
            Hasło
          </label>
          <input id="password" name="password" type="password" placeholder="••••••••" value={password}
            onChange={(e) => setPassword(e.target.value)} required
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"/>
        </div>

        <button type="submit" disabled={isPending}
          className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 active:bg-orange-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-xl transition-all shadow-md shadow-orange-600/20 disabled:opacity-50 cursor-pointer">
          {isPending ? "Logowanie..." : "Zaloguj się"}
        </button>
        <p>{state?.error}</p>
      </form>


        <div className="pt-2 text-center text-sm text-slate-600 dark:text-slate-400">
          <Link href="/register"><p>Nie posiadasz konta? Zarejestruj się!</p></Link>
        </div>
    </div>
  );
}
