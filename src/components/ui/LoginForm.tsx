"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { loginSchema } from "@/lib/validators/auth";

interface LoginFormProps {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
}

export default function LoginForm({
  onSuccess,
  onSwitchToRegister,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      setErrorMessage(
        validation.error.issues[0]?.message || "Błąd danych formularza.",
      );
      setLoading(false);
      return;
    }

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setErrorMessage("Nieprawidłowy e-mail lub hasło.");
      } else {
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (err) {
      console.error("Błąd logowania:", err);
      setErrorMessage("Wystąpił nieoczekiwany błąd. Spróbuj ponownie.");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: "google" | "github") => {
    setOauthLoading(provider);
    setErrorMessage("");

    try {
      await signIn(provider, { callbackUrl: "/" });
    } catch (err) {
      console.error(`Błąd OAuth (${provider}):`, err);
      setErrorMessage("Błąd podczas logowania przez dostawcę zewnętrznego.");
      setOauthLoading(null);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          LightningChess
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Zaloguj się do swojego konta
        </p>
      </div>

      {errorMessage && (
        <div className="p-3.5 text-sm text-red-600 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-xl">
          {errorMessage}
        </div>
      )}

      <div className="space-y-3">
        <button
          type="button"
          disabled={loading || oauthLoading !== null}
          onClick={() => handleOAuthLogin("google")}
          className="w-full py-2.5 px-4 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          {oauthLoading === "google" ? "Łączenie..." : "Kontynuuj z Google"}
        </button>
      </div>

      <div className="relative flex items-center justify-center">
        <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
        <span className="bg-white dark:bg-slate-900 px-3 text-xs text-slate-400 uppercase tracking-wider absolute">
          lub
        </span>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
          >
            Adres E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="twoj@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
          >
            Hasło
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={loading || oauthLoading !== null}
          className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 active:bg-orange-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-xl transition-all shadow-md shadow-orange-600/20 disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Logowanie..." : "Zaloguj się"}
        </button>
      </form>

      {onSwitchToRegister && (
        <div className="pt-2 text-center text-sm text-slate-600 dark:text-slate-400">
          Nie masz jeszcze konta?{" "}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400 hover:underline transition-colors focus:outline-none cursor-pointer"
          >
            Zarejestruj się
          </button>
        </div>
      )}
    </div>
  );
}
