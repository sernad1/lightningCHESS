"use client";

import React, { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { RegisterFormProps } from "@/types/auth";

export default function RegisterForm({
  onSuccess,
  onSwitchToLogin,
}: RegisterFormProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Hasła nie są identyczne.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Hasło musi mieć co najmniej 6 znaków.");
      setLoading(false);
      return;
    }

    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        setErrorMessage(authError.message);
        setLoading(false);
        return;
      }
      if (data.user) {
        const res = await fetch("/api/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: data.user.id,
            email: data.user.email,
            username: username,
          }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          setErrorMessage(
            errorData.error || "Nie udało się utworzyć profilu gracza.",
          );
        } else {
          setSuccessMessage(
            "Konto zostało pomyślnie utworzone! Możesz się teraz zalogować.",
          );
          setUsername("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");

          if (onSuccess) {
            onSuccess();
          }
        }
      }
    } catch (err) {
      console.error("Błąd rejestracji:", err);
      setErrorMessage("Wystąpił nieoczekiwany błąd. Spróbuj ponownie.");
    } finally {
      setLoading(false);
    }
  };

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
      {errorMessage && (
        <div className="p-3.5 text-sm text-red-600 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-xl">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="p-3.5 text-sm text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 rounded-xl">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
          >
            Nazwa użytkownika
          </label>
          <input
            id="username"
            type="text"
            placeholder="np. Szachmistrz99"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
          >
            Adres e-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="gracz@lightningchess.pl"
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

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
          >
            Powtórz hasło
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 active:bg-orange-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-xl transition-all shadow-md shadow-orange-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Rejestrowanie..." : "Zarejestruj się"}
        </button>
      </form>

      {onSwitchToLogin && (
        <div className="pt-2 text-center text-sm text-slate-600 dark:text-slate-400">
          Masz już konto?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400 hover:underline transition-colors focus:outline-none cursor-pointer"
          >
            Zaloguj się
          </button>
        </div>
      )}
    </div>
  );
}
