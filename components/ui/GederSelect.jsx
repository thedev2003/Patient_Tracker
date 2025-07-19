export function GenderSelect({ error, ...props }) {
	return (
		<div className="flex flex-col gap-1">
			<label className="font-medium">Gender</label>
			<select className={`border rounded px-3 py-2 ${error ? "border-red-500" : "border-gray-300"}`} {...props}>
				<option value="">Select gender</option>
				<option value="Male">Male</option>
				<option value="Female">Female</option>
				<option value="Other">Other</option>
			</select>
			{error && <span className="text-sm text-red-500">{error}</span>}
		</div>
	);
}