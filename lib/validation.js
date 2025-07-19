import { z } from "zod";

export const PatientFormSchema = z.object({
	name: z.string().min(2, "Name is required"),
	email: z.string().email("Invalid email"),
	phone: z.string().min(10, "Phone is required"),
	gender: z.enum(["Male", "Female", "Other"], { required_error: "Gender is required" }),
	birthDate: z.string().min(1, "Birth date is required"),
});