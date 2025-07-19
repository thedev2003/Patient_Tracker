"use client";
import { forwardRef } from "react";

export const Input = forwardRef(function Input(
	{ label, name, type = "text", className = "", ...props },
	ref
) {
	return (
		<div className={`flex flex-col gap-1 ${className}`}>
			{label && (
				<label htmlFor={name} className="font-medium text-gray-700">
					{label}
				</label>
			)}
			<input
				ref={ref}
				id={name}
				name={name}
				type={type}
				className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-gray-900"
				{...props}
			/>
		</div>
	);
});