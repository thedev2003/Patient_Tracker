import { dbConnect } from "@/lib/db";
import Patient from "@/models/Patient";

export async function POST(req) {
	await dbConnect();
	const { name, email, age, gender } = await req.json();
	if (!name || !email || !age || !gender) {
		return Response.json({ error: "All fields are required" }, { status: 400 });
	}
	try {
		const patient = await Patient.create({ name, email, age, gender });
		return Response.json({ patient });
	} catch (e) {
		return Response.json({ error: e.message }, { status: 400 });
	}
}

export async function GET() {
	await dbConnect();
	const patients = await Patient.find().sort({ createdAt: -1 });
	return Response.json({ patients });
}