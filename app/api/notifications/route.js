import { dbConnect } from "@/lib/db";
import Notification from "@/models/Notification";

export async function GET() {
	await dbConnect();
	const notifications = await Notification.find().sort({ createdAt: -1 });
	return Response.json({ notifications });
}

export async function POST(req) {
	await dbConnect();
	const { title, message } = await req.json();
	if (!title || !message) {
		return Response.json({ error: "Title and message required" }, { status: 400 });
	}
	const notification = await Notification.create({ title, message });
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