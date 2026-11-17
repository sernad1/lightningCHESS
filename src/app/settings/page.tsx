import { redirect } from "next/navigation";
import { auth } from "@/auth";
import SettingsClient from "@/components/settings/SettingsClient";
import { SettingsFooter } from "@/components/settings/SettingsFooter";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user) redirect("/");

  return (
    <SettingsClient>
      <SettingsFooter/>
    </SettingsClient>
  );
}