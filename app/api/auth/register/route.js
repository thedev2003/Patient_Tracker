import { registerUser } from "@/lib/auth";

export async function POST(req) {
	const { name, email, password, role } = await req.json();
	if (!name || !email || !password) {
		return Response.json({ error: "Missing required fields" }, { status: 400 });
	}
	try {
		const user = await registerUser({ name, email, password, role });
		return Response.json({ user: { id: user._id, email: user.email, name: user.name, role: user.role } });
	} catch (e) {
		return Response.json({ error: e.message }, { status: 400 });
	}
}