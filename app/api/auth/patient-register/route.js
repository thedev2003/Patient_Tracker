import { dbConnect } from "@/lib/db";
import Patient from "@/models/Patient";
import Otp from "@/models/Otp";
import { sendSms } from "@/lib/sms";
import { patientRegistrationSchema } from "@/lib/validation/patient";

export async function POST(req) {
	await dbConnect();
	const body = await req.json();
	const result = patientRegistrationSchema.safeParse(body);
	if (!result.success) {
		return Response.json({ error: "Invalid input" }, { status: 400 });
	}
	const { name, phone, email, age, gender, otp } = result.data;

	const otpRecord = await Otp.findOne({ phone, code: otp, verified: true });
	if (!otpRecord) return Response.json({ error: "OTP not verified" }, { status: 400 });

	try {
		const patient = await Patient.create({ name, phone, email, age, gender });
		await sendSms({ to: phone, message: "Welcome to Patient Tracker!" });
		return Response.json({ patient });
	} catch (e) {
		return Response.json({ error: e.message }, { status: 400 });
	}
}