import { LucideIcon } from "lucide-react";
export type TabType = "play" | "puzzles" | "history" | "stats" | "settings";
export interface SidebarProps {
  activeTab?: TabType;
  onSelectTab?: (tab: TabType) => void;
}
export interface NavigationItem {
  id: TabType;
  label: string;
  icon: LucideIcon;
}
