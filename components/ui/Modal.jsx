import { useEffect } from "react";

export function Modal({ isOpen, onClose, children }) {
	useEffect(() => {
		function onKeyDown(e) {
			if (e.key === "Escape") onClose();
		}
		if (isOpen) window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [isOpen, onClose]);

	if (!isOpen) return null;
	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
			<div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
				<button onClick={onClose} className="absolute right-4 top-4 text-gray-500">&times;</button>
				{children}
			</div>
		</div>
	);
}