"use server"

import { signIn, signOut } from "@/auth"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { loginSchema, registerSchema} from "@/lib/validators/auth"
import { AuthError } from "next-auth"

export const googlelogin = async() => {
    await signIn("google", {redirectTo: "/"})
}

export const credentialslogin = async (prevState: { error?: string } | undefined, formData: FormData) => {
  const rawData = Object.fromEntries(formData);
  const validatedFields = loginSchema.safeParse(rawData);

  if (!validatedFields.success) return { error: "Nieprawidłowe dane logowania." };

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

export const signup = async(prevState: { error?: string } | undefined, formData: FormData) => {
  const rawData = Object.fromEntries(formData)
  const validatedFields = registerSchema.safeParse(rawData);
  

  if (!validatedFields.success){
    const firstError = validatedFields.error.issues[0]?.message;
    return { error: firstError ?? "Nieprawidłowe dane w formularzu." };
  } 

  const {username, email, password} = validatedFields.data;
  const user = await prisma.user.findUnique({
    where: {email: email}
  })
  
  if(user) return { error: "Ten adres mailowy już jest zajęty" };

  const hashedPassword = await bcrypt.hash(password,11);
  await prisma.user.create({
    data: {
      email: email,
      username: username,
      password: hashedPassword
    }
  });

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return {error: "Konto utworzone, ale logowanie się nie udało"}
    }

    throw error;
  }
}

export const logout = async() => {
    await signOut({redirectTo: "/"})
}