import { redirect } from "next/navigation";
import { auth } from "@/auth";
import SettingsClient from "@/components/settings/SettingsClient";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user) redirect("/");

  return <SettingsClient />;
}