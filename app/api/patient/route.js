import { dbConnect } from "@/lib/db";
import Patient from "@/models/Patient";
import { PatientFormSchema } from "@/lib/validation";

export async function POST(req) {
	try {
		const body = await req.json();
		// Validate input
		const parsed = PatientFormSchema.safeParse(body);
		if (!parsed.success) {
			return Response.json({ error: parsed.error.errors }, { status: 400 });
		}

		await dbConnect();
		// Check if patient already exists (by email)
		const exists = await Patient.findOne({ email: body.email });
		if (exists) {
			return Response.json({ error: "Patient already registered." }, { status: 409 });
		}

		const patient = await Patient.create(body);
		return Response.json({ message: "Patient registered successfully!", patient });
	} catch (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}
}