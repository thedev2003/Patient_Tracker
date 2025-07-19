export function NotificationBadge({ count }) {
	if (!count || count < 1) return null;
	return (
		<span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-red-600 text-white">
			{count}
		</span>
	);
}