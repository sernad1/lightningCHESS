"use client";
import {
  ChessQueen,
  Puzzle,
  RotateCcwClock,
  ChartNoAxesColumn,
  Settings,
  Zap,
} from "lucide-react";
import { NavigationItem } from "@/types/navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";
const NAVIGATION_ITEMS: NavigationItem[] = [
  { href: "/play", label: "Graj", icon: ChessQueen },
  { href: "/puzzles", label: "Zagadki", icon: Puzzle },
  { href: "/history", label: "Historia gier", icon: RotateCcwClock },
  { href: "/stats", label: "Statystyki", icon: ChartNoAxesColumn },
  { href: "/settings", label: "Ustawienia", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 h-screen shrink-0 bg-main-darkest text-main-white p-4 flex flex-col justify-between">
      <nav className="space-y-1.5">
        <div className="flex items-center gap-3 text-xl mb-8">
          <Zap className="w-6 h-6 text-main-accent" />
          <span>LightningChess</span>
        </div>
        {NAVIGATION_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl ${
                isActive
                  ? "bg-main-dark text-main-white font-semibold"
                  : "text-slate-300 hover:bg-main-dark/50 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-main-accent" />
                <span>{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
