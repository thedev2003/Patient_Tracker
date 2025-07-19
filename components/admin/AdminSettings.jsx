"use client";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function AdminSettings() {
	// Example: dummy state for profile settings
	const [name, setName] = useState("Admin User");
	const [email, setEmail] = useState("admin@example.com");
	const [success, setSuccess] = useState(false);

	function handleSubmit(e) {
		e.preventDefault();
		// Here, you would call your API to update settings
		setSuccess(true);
		setTimeout(() => setSuccess(false), 2000);
	}

	return (
		<section>
			<h1 className="text-2xl font-bold mb-6">Settings</h1>
			<form onSubmit={handleSubmit} className="max-w-md bg-white p-6 rounded shadow flex flex-col gap-4">
				<Input
					label="Name"
					name="name"
					value={name}
					onChange={e => setName(e.target.value)}
					required
				/>
				<Input
					label="Email"
					name="email"
					type="email"
					value={email}
					onChange={e => setEmail(e.target.value)}
					required
				/>
				<Button type="submit">Save Changes</Button>
				{success && <div className="text-green-600 text-sm">Settings updated!</div>}
			</form>
		</section>
	);
}