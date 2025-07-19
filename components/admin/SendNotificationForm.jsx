"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function SendNotificationForm({ patients }) {
	const [patientId, setPatientId] = useState("");
	const [title, setTitle] = useState("");
	const [message, setMessage] = useState("");
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState("");

	async function handleSubmit(e) {
		e.preventDefault();
		setSuccess(false);
		setError("");
		const res = await fetch("/api/notifications", {
			method: "POST",
			body: JSON.stringify({ title, message, patient: patientId }),
			headers: { "Content-Type": "application/json" },
		});
		const data = await res.json();
		if (res.ok) {
			setSuccess(true);
			setTitle("");
			setMessage("");
			setPatientId("");
		} else {
			setError(data.error || "Failed to send notification.");
		}
	}

	return (
		<form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-lg flex flex-col gap-3">
			<label className="font-medium text-gray-700">Patient</label>
			<select
				value={patientId}
				onChange={e => setPatientId(e.target.value)}
				required
				className="px-3 py-2 border border-gray-300 rounded"
			>
				<option value="">Select patient...</option>
				{patients.map(p => (
					<option key={p._id} value={p._id}>{p.name} — {p.email}</option>
				))}
			</select>
			<Input label="Title" value={title} onChange={e => setTitle(e.target.value)} required />
			<Input label="Message" value={message} onChange={e => setMessage(e.target.value)} required />
			<Button type="submit">Send Notification</Button>
			{success && <div className="text-green-600 text-sm">Notification sent!</div>}
			{error && <div className="text-red-600 text-sm">{error}</div>}
		</form>
	);
}