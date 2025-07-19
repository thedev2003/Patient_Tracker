"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PatientFormSchema } from "@/lib/validation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { GenderSelect } from "@/components/ui/GenderSelect";

export default function PatientForm() {
	const [submitting, setSubmitting] = useState(false);
	const [success, setSuccess] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: zodResolver(PatientFormSchema),
		defaultValues: {
			name: "",
			email: "",
			phone: "",
			gender: "",
			birthDate: "",
		},
	});

	async function onSubmit(values) {
		setSubmitting(true);
		setSuccess(false);
		try {
			const res = await fetch("/api/patient", {
				method: "POST",
				body: JSON.stringify(values),
				headers: { "Content-Type": "application/json" },
			});
			if (res.ok) {
				setSuccess(true);
				reset();
			}
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<form className="space-y-4" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
			<Input label="Name" {...register("name")} error={errors.name?.message} />
			<Input label="Email" type="email" {...register("email")} error={errors.email?.message} />
			<Input label="Phone" {...register("phone")} error={errors.phone?.message} />
			<GenderSelect {...register("gender")} error={errors.gender?.message} />
			<Input label="Birth Date" type="date" {...register("birthDate")} error={errors.birthDate?.message} />
			<Button type="submit" disabled={submitting}>
				{submitting ? "Submitting..." : "Register"}
			</Button>
			{success && <div className="text-green-600">Patient registered successfully!</div>}
		</form>
	);
}