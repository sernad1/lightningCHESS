import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-emerald-950 text-white px-4 text-center">
      <div className="max-w-md w-full bg-emerald-900/40 p-8 rounded-2xl shadow-xl border border-emerald-800/50 backdrop-blur-sm">
        <div className="text-5xl mb-4">⚡</div>

        <h1 className="text-4xl font-extrabold tracking-tight mb-2 text-emerald-100">
          LightningChess
        </h1>
        <p className="text-emerald-200/80 mb-8 text-sm sm:text-base">
          Graj w szachy online, rozwiązuj zagadki i rywalizuj z graczami online!
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center">
          <Link
            href="/login"
            className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg shadow-md transition-all duration-200"
          >
            Zaloguj się
          </Link>

          <Link
            href="/register"
            className="w-full sm:w-auto px-6 py-3 bg-transparent hover:bg-emerald-800/50 text-emerald-100 font-semibold rounded-lg border border-emerald-600 transition-all duration-200"
          >
            Zarejestruj się
          </Link>
        </div>
      </div>
    </main>
  );
}
