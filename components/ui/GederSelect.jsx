"use client";
export function GenderSelect({ name = "gender", label = "Gender", ...props }) {
	return (
		<div className="flex flex-col gap-1">
			<label htmlFor={name} className="font-medium text-gray-700">
				{label}
			</label>
			<select
				id={name}
				name={name}
				className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
				{...props}
			>
				<option value="">Select...</option>
				<option value="male">Male</option>
				<option value="female">Female</option>
				<option value="other">Other</option>
			</select>
		</div>
	);
}