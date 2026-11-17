import { LucideIcon } from "lucide-react";

export interface NavigationItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export type StatusMessageType = "success" | "error";
export type StatusMessage = {
  type: StatusMessageType;
  text: string;
}