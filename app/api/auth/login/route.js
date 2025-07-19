import { authenticateUser } from "@/lib/auth";

export async function POST(req) {
	const { email, password } = await req.json();
	if (!email || !password) {
		return Response.json({ error: "Missing email or password" }, { status: 400 });
	}
	try {
		const user = await authenticateUser(email, password);
		if (!user) {
			return Response.json({ error: "Invalid credentials" }, { status: 401 });
		}
		// In production, you should return a JWT or session here
		return Response.json({ user: { id: user._id, email: user.email, name: user.name, role: user.role } });
	} catch (e) {
		return Response.json({ error: e.message }, { status: 500 });
	}
}