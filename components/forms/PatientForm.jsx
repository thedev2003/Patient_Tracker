"use client";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { GenderSelect } from "@/components/ui/GenderSelect";
import { Button } from "@/components/ui/Button";
import { Loader } from "@/components/ui/Loader";

export default function PatientForm({ onSuccess }) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();
		setLoading(true);
		setError("");
		setSuccess(false);

		const form = e.target;
		const data = {
			name: form.name.value,
			email: form.email.value,
			age: form.age.value,
			gender: form.gender.value,
		};

		const res = await fetch("/api/patient", {
			method: "POST",
			body: JSON.stringify(data),
			headers: { "Content-Type": "application/json" },
		});
		const result = await res.json();
		if (res.ok) {
			setSuccess(true);
			if (onSuccess) onSuccess();
			form.reset();
		} else {
			setError(result.error || "Failed to register patient.");
		}
		setLoading(false);
	}

	return (
		<form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-md mx-auto flex flex-col gap-4">
			<Input name="name" label="Name" required />
			<Input name="email" label="Email" type="email" required />
			<Input name="age" label="Age" type="number" min={0} required />
			<GenderSelect name="gender" required />
			<Button type="submit" disabled={loading}>
				{loading ? <Loader /> : "Register Patient"}
			</Button>
			{success && <div className="text-green-600 text-sm">Patient registered!</div>}
			{error && <div className="text-red-600 text-sm">{error}</div>}
		</form>
	);
}