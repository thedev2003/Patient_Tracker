"use client";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function RegisterForm() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();
		setError("");
		setSuccess(false);
		setLoading(true);
		const form = e.target;
		const name = form.name.value;
		const email = form.email.value;
		const password = form.password.value;
		const res = await fetch("/api/auth/register", {
			method: "POST",
			body: JSON.stringify({ name, email, password }),
			headers: { "Content-Type": "application/json" },
		});
		const data = await res.json();
		if (res.ok) {
			setSuccess(true);
			form.reset();
		} else {
			setError(data.error || "Registration failed");
		}
		setLoading(false);
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
			<Input name="name" label="Name" required />
			<Input name="email" type="email" label="Email" required />
			<Input name="password" type="password" label="Password" required />
			<Button type="submit" disabled={loading}>
				{loading ? "Registering..." : "Register"}
			</Button>
			{success && <div className="text-green-600 text-sm">Registration successful!</div>}
			{error && <div className="text-red-600 text-sm">{error}</div>}
		</form>
	);
}