export function Input({ label, error, ...props }) {
	return (
		<div className="flex flex-col gap-1">
			<label className="font-medium">{label}</label>
			<input
				className={`border rounded px-3 py-2 focus:outline-none focus:ring ${error ? "border-red-500" : "border-gray-300"}`}
				{...props}
			/>
			{error && <span className="text-sm text-red-500">{error}</span>}
		</div>
	);
}