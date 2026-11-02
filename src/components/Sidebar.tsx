"use client";
import {
  ChessQueen,
  Puzzle,
  RotateCcwClock,
  ChartNoAxesColumn,
  Settings,
  Zap,
} from "lucide-react";
import { NavigationItem, SidebarProps } from "@/types/navigation";

const NAVIGATION_ITEMS: NavigationItem[] = [
  { id: "play", label: "Graj", icon: ChessQueen },
  { id: "puzzles", label: "Zagadki", icon: Puzzle },
  { id: "history", label: "Historia gier", icon: RotateCcwClock },
  { id: "stats", label: "Statystyki", icon: ChartNoAxesColumn },
  { id: "settings", label: "Ustawienia", icon: Settings },
];

export default function Sidebar({
  activeTab = "play",
  onSelectTab,
}: SidebarProps) {
  return (
    <aside className="w-64 h-screen bg-main-darkest text-main-white p-4 flex flex-col justify-between">
      <nav className="space-y-1.5">
        <div className="flex items-center gap-3 text-xl mb-8">
          <Zap className="w-6 h-6 text-main-accent" />
          <span>LightningChess</span>
        </div>
        {NAVIGATION_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab?.(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl ${
                isActive
                  ? "bg-main-dark text-main-white font-semibold"
                  : "text-slate-300 hover:bg-brand-dark/50 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-main-accent" />
                <span>{item.label}</span>
              </div>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
