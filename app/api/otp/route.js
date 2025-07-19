import { dbConnect } from "@/lib/db";
import Otp from "@/models/Otp";
import { sendSms } from "@/lib/sms";
import { requestOtpSchema, verifyOtpSchema } from "@/lib/validation/otp";

function generateOtpCode() {
	return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req) {
	await dbConnect();
	const body = await req.json();
	const result = requestOtpSchema.safeParse(body);
	if (!result.success) {
		return Response.json({ error: "Invalid phone number" }, { status: 400 });
	}
	const { phone } = result.data;

	const code = generateOtpCode();
	const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min expiry

	await Otp.deleteMany({ phone }); // Remove old OTPs for this phone
	await Otp.create({ phone, code, expiresAt });

	const smsRes = await sendSms({
		to: phone,
		message: `Your OTP code is: ${code} (valid for 10 minutes)`,
	});

	if (!smsRes.success) {
		return Response.json({ error: "Failed to send SMS" }, { status: 500 });
	}

	return Response.json({ success: true });
}

export async function PATCH(req) {
	await dbConnect();
	const body = await req.json();
	const result = verifyOtpSchema.safeParse(body);
	if (!result.success) {
		return Response.json({ error: "Invalid input" }, { status: 400 });
	}
	const { phone, code } = result.data;

	const otp = await Otp.findOne({ phone, code });
	if (!otp) return Response.json({ error: "Invalid code" }, { status: 400 });
	if (otp.verified) return Response.json({ error: "OTP already used" }, { status: 400 });
	if (otp.expiresAt < new Date()) return Response.json({ error: "OTP expired" }, { status: 400 });

	otp.verified = true;
	await otp.save();

	return Response.json({ success: true });
}