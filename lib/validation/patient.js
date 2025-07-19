import { z } from "zod";

export const patientRegistrationSchema = z.object({
	name: z.string().min(1),
	phone: z.string().min(10).max(15),
	email: z.string().email(),
	age: z.coerce.number().min(0).max(120),
	gender: z.enum(["male", "female", "other"]),
	otp: z.string().length(6),
});