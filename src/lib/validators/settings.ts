import z from "zod";

export const updateUsernameSchema = z.object({
  username: z.string().trim().min(3, "Min length: 3").max(24, "Max length: 24")
});