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
    <>
      <aside className="fixed bottom-0 left-0 right-0 z-50 bg-main-darkest text-main-white border-t border-main-dark/60 px-2 py-1.5 md:static md:w-64 md:h-screen md:shrink-0 md:border-t-0 md:border-r md:border-main-dark/60 md:p-4 flex flex-col justify-between">
        <nav className="flex flex-row items-center justify-around md:flex-col md:items-stretch md:justify-start md:space-y-1.5">
          <Link
            className="hidden md:flex items-center gap-3 text-xl font-bold mb-8 px-2"
            href="/"
          >
            <Zap className="w-6 h-6 text-main-accent" />
            <span>LightningChess</span>
          </Link>

          {NAVIGATION_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 px-2 py-1.5 md:px-3.5 md:py-2.5 rounded-xl transition-colors md:w-full ${
                  isActive
                    ? "bg-main-dark text-main-white font-semibold"
                    : "text-main-light/80 hover:bg-main-dark/50 hover:text-main-white"
                }`}
              >
                <Icon className="w-5 h-5 shrink-0 text-main-accent" />
                <span className="text-[11px] md:text-base truncate max-w-[68px] md:max-w-none">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className="h-16 shrink-0 md:hidden" aria-hidden="true" />
    </>
  );
}
