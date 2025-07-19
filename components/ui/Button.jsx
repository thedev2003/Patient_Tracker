export function Button({ children, ...props }) {
	return (
		<button
			className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-60"
			{...props}
		>
			{children}
		</button>
	);
}