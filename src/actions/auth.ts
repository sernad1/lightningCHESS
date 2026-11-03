"use server";

import { auth, signIn, signOut } from "@/auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { loginSchema, registerSchema } from "@/lib/validators/auth";
import { AuthError } from "next-auth";

export const googlelogin = async () => {
  await signIn("google", { redirectTo: "/" });
};

export const credentialslogin = async (
  prevState: { error?: string } | undefined,
  formData: FormData
) => {
  const rawData = Object.fromEntries(formData);
  const validatedFields = loginSchema.safeParse(rawData);

  if (!validatedFields.success)
    return { error: "Nieprawidłowe dane logowania." };

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Błędny e-mail lub hasło." };
        default:
          return { error: "Wystąpił błąd podczas logowania." };
      }
    }

    throw error;
  }
};

export const signup = async (
  prevState: { error?: string } | undefined,
  formData: FormData
) => {
  const rawData = Object.fromEntries(formData);
  const validatedFields = registerSchema.safeParse(rawData);

  if (!validatedFields.success) {
    const firstError = validatedFields.error.issues[0]?.message;
    return { error: firstError ?? "Nieprawidłowe dane w formularzu." };
  }

  const { username, email, password } = validatedFields.data;
 
  // Check if the email is already registered
  try{
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{email : email},{username: username}],
      },
  });
  if(existingUser){
    if(existingUser.email === email){
      return { error: "Ten e-mail jest już zarejestrowany." };
    }
    return { error: "Ta nazwa użytkownika jest już zajęta." };
  }



  

  const hashedPassword = await bcrypt.hash(password, 11);
  await prisma.user.create({
    data: {
      email: email,
      username: username,
      password: hashedPassword,
    },
  });
}catch (error) {
  console.error("Błąd podczas rejestracji w bazie", error);
  return {error : "Nie udało się stworzyć konta. Spróbuj ponownie później."};
}

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Konto utworzone, ale logowanie się nie udało" };
    }

    throw error;
  }
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};

export async function deleteAccount() {
  const session = await auth();
  if (!session?.user?.id) return { error: "Brak autoryzacji" };

  try {
    await prisma.user.delete({
      where: { id: session.user.id },
    });
  } catch {
    return { error: "Wystąpił błąd podczas usuwania konta." };
  }

  await signOut({ redirectTo: "/" });
}
