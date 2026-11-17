import { auth } from "@/auth";
import Sidebar from "@/components/Sidebar";
import LandingPage from "@/components/LandingPage";

export const instant = false; 
export default async function HomePage() {
  const session = await auth();

  if (!session) {
    return <LandingPage />;
  }

  return (
    <div className="flex min-h-screen bg-emerald-950 text-white">
      <Sidebar />

      <main className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">
            Witaj, {session.user?.name || session.user?.email}! 👋
          </h1>
          <p className="text-main-light text-sm mt-1">
            Wybierz opcję z Sidebaru, aby rozpocząć.
          </p>
        </header>
      </main>
    </div>
  );
}
