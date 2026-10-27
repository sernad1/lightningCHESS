import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, email, username } = body;

    if (!id || !email || !username) {
      return NextResponse.json(
        { error: "Brak wymaganych danych" },
        { status: 400 }
      );
    }
    const user = await prisma.user.create({
      data: {
        id: id,
        email: email,
        username: username,
        boardTheme: "classic",
        pieceTheme: "classic",
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    console.error("Błąd podczas tworzenia profilu w Prismie:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Użytkownik o takiej nazwie lub e-mailu już istnieje." },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: "Błąd bazy danych" }, { status: 500 });
  }
}
