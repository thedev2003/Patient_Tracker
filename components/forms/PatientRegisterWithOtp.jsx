"use client";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { GenderSelect } from "@/components/ui/GenderSelect";

export default function PatientRegisterWithOtp() {
	const [step, setStep] = useState(1);
	const [form, setForm] = useState({ name: "", phone: "", email: "", age: "", gender: "", otp: "" });
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);

	async function requestOtp(e) {
		e.preventDefault();
		setError(""); setLoading(true);
		const res = await fetch("/api/otp", {
			method: "POST",
			body: JSON.stringify({ phone: form.phone }),
			headers: { "Content-Type": "application/json" },
		});
		const data = await res.json();
		if (res.ok) {
			setStep(2);
		} else {
			setError(data.error || "Failed to send OTP");
		}
		setLoading(false);
	}

	async function verifyAndRegister(e) {
		e.preventDefault();
		setError(""); setLoading(true);
		const res = await fetch("/api/auth/patient-register", {
			method: "POST",
			body: JSON.stringify(form),
			headers: { "Content-Type": "application/json" },
		});
		const data = await res.json();
		if (res.ok) {
			setSuccess(true); setStep(3);
		} else {
			setError(data.error || "Registration failed");
		}
		setLoading(false);
	}

	function handleChange(e) {
		setForm({ ...form, [e.target.name]: e.target.value });
	}

	return (
		<div className="max-w-sm mx-auto bg-white p-6 rounded shadow">
			{step === 1 && (
				<form onSubmit={requestOtp} className="space-y-4">
					<Input name="name" label="Name" value={form.name} onChange={handleChange} required />
					<Input name="phone" label="Phone" value={form.phone} onChange={handleChange} required />
					<Input name="email" label="Email" value={form.email} onChange={handleChange} required />
					<Input name="age" label="Age" type="number" value={form.age} onChange={handleChange} required />
					<GenderSelect name="gender" value={form.gender} onChange={handleChange} required />
					<Button type="submit" disabled={loading}>{loading ? "Sending OTP..." : "Send OTP"}</Button>
					{error && <div className="text-red-600 text-sm">{error}</div>}
				</form>
			)}
			{step === 2 && (
				<form onSubmit={verifyAndRegister} className="space-y-4">
					<Input name="otp" label="Enter OTP" value={form.otp} onChange={handleChange} required />
					<Button type="submit" disabled={loading}>{loading ? "Verifying..." : "Verify & Register"}</Button>
					{error && <div className="text-red-600 text-sm">{error}</div>}
				</form>
			)}
			{step === 3 && success && (
				<div className="text-green-600 text-center">Registration successful!</div>
			)}
		</div>
	);
}