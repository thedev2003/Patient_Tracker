"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function LoginForm() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();

	async function handleSubmit(e) {
		e.preventDefault();
		setError("");
		setLoading(true);
		const form = e.target;
		const email = form.email.value;
		const password = form.password.value;
		const res = await fetch("/api/auth/login", {
			method: "POST",
			body: JSON.stringify({ email, password }),
			headers: { "Content-Type": "application/json" },
		});
		const data = await res.json();
		if (res.ok) {
			router.push("/admin");
		} else {
			setError(data.error || "Login failed");
		}
		setLoading(false);
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
			<Input name="email" type="email" label="Email" required />
			<Input name="password" type="password" label="Password" required />
			<Button type="submit" disabled={loading}>
				{loading ? "Logging in..." : "Login"}
			</Button>
			{error && <div className="text-red-600 text-sm">{error}</div>}
		</form>
	);
}