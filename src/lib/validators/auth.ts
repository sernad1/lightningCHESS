import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "E-mail jest wymagany")
    .email("Nieprawidłowy format e-mail"),
  password: z.string().min(6, "Hasło musi mieć co najmniej 6 znaków"),
});

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Nazwa użytkownika musi mieć co najmniej 3 znaki")
    .max(20, "Nazwa użytkownika może mieć maksymalnie 20 znaków"),
  email: z
    .string()
    .min(1, "E-mail jest wymagany")
    .email("Nieprawidłowy format e-mail"),
  password: z.string().min(6, "Hasło musi mieć co najmniej 6 znaków"),
  confirmPassword: z.string().min(6, "Hasło musi mieć co najmniej 6 znaków")
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Hasła muszą być identyczne",
    path: ["confirmPassword"],
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
