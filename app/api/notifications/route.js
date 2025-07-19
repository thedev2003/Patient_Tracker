import { dbConnect } from "@/lib/db";
import Notification from "@/models/Notification";

export async function GET(req) {
	await dbConnect();
	const url = new URL(req.url, "http://localhost");
	const patientId = url.searchParams.get("patient");
	let query = {};
	if (patientId) query.patient = patientId;
	const notifications = await Notification.find(query).sort({ createdAt: -1 });
	return Response.json({ notifications });
}

export async function POST(req) {
	await dbConnect();
	const { title, message, patient } = await req.json();
	if (!title || !message) {
		return Response.json({ error: "Title and message required" }, { status: 400 });
	}
	const notification = await Notification.create({ title, message, patient });
	return Response.json({ notification });
}

export async function PATCH(req) {
	await dbConnect();
	const { id } = await req.json();
	if (!id) {
		return Response.json({ error: "Notification ID required" }, { status: 400 });
	}
	await Notification.findByIdAndUpdate(id, { read: true });
	return Response.json({ success: true });
}