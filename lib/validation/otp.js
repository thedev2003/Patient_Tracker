import { z } from "zod";

export const requestOtpSchema = z.object({
	phone: z.string().min(10).max(15),
});

export const verifyOtpSchema = z.object({
	phone: z.string().min(10).max(15),
	code: z.string().length(6),
});