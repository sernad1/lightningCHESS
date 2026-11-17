"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { updateUsernameSchema } from "@/lib/validators/settings";

export async function updateUsername(newUsername: string) {
  const session = await auth();
  if (!session?.user?.email) return { success: false, error: "Brak autoryzacji." };
  
  const parsed = updateUsernameSchema.safeParse({ username: newUsername });
  if (!parsed.success) return { success: false, error: parsed.error.issues[0]?.message ?? "Error"};

  await prisma.user.update({
    where: { email: session.user.email },
    data: { username: parsed.data.username },
  });

  revalidatePath("/settings");

  return { success: true };
}