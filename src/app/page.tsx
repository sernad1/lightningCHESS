import { auth } from "@/auth";
import Sidebar from "@/components/Sidebar"; // Twój istniejący komponent!
import LandingPage from "@/components/LandingPage"; // Twój/prosty komponent powitalny

export const instant = false; // Wyłącz natychmiastowe renderowanie, aby umożliwić sprawdzenie sesji
export default async function HomePage() {
  const session = await auth();

  // 1. Jeśli użytkownik NIE JEST zalogowany -> Wyświetlamy samą stronę powitalną
  if (!session) {
    return <LandingPage />;
  }

  // 2.  uzytkownik JEST zalogowany
  return (
    <div className="flex min-h-screen bg-emerald-950 text-white">
      <Sidebar />

      {/* obszar roboczy  */}
      <main className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">
            Witaj, {session.user?.name || session.user?.email}! 👋
          </h1>
          <p className="text-emerald-300/70 text-sm mt-1">
            Wybierz opcję z Sidebaru, aby rozpocząć.
          </p>
        </header>
      </main>
    </div>
  );
}
