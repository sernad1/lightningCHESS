import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "../../../../lib/prisma"; // Lub relatywnie: "../../../../lib/prisma"
import { registerSchema } from "@/lib/validators/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Walidacja danych wejściowych za pomocą Zod
    const validation = registerSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0]?.message || "Nieprawidłowe dane" },
        { status: 400 },
      );
    }

    const { email, username, password } = validation.data;

    // 2. Sprawdzenie, czy użytkownik już istnieje (Email lub Username)
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Użytkownik o takim e-mailu lub nazwie już istnieje." },
        { status: 400 },
      );
    }

    // 3. Haszowanie hasła za pomocą bcryptjs
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Tworzenie nowego użytkownika w bazie danych Prisma
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword, // Pamiętaj, aby pole w schema.prisma nazywało się 'password' lub 'passwordHash'
        boardTheme: "classic",
        pieceTheme: "classic",
      },
      select: {
        id: true,
        email: true,
        username: true,
        boardTheme: true,
        pieceTheme: true,
        createdAt: true,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    console.error("Błąd podczas rejestracji użytkownika w Prismie:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Użytkownik o takiej nazwie lub e-mailu już istnieje." },
        { status: 400 },
      );
    }

    return NextResponse.json({ error: "Błąd bazy danych" }, { status: 500 });
  }
}
