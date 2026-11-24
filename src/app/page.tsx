import { auth } from "@/auth";
import Sidebar from "@/components/Sidebar";
import LandingPage from "@/components/LandingPage";
import { GameSetupCard } from "@/components/chess/GameSetupCard";

export const instant = false;

export default async function HomePage() {
  const session = await auth();

  if (!session) {
    return <LandingPage />;
  }

  return (
    <div className="flex min-h-screen bg-main-darkest text-main-white">
      <Sidebar />

      <main className="flex-1 p-8 flex flex-col">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">
            Witaj, {session.user?.name || session.user?.email}! 👋
          </h1>
          <p className="text-main-light text-sm mt-1">
            Skonfiguruj nową partię poniżej lub wybierz opcję z Sidebaru.
          </p>
        </header>

        <div className="mt-4">
          <GameSetupCard />
        </div>
      </main>
    </div>
  );
}
