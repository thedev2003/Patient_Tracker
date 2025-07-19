"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

export default function AdminNotifications() {
	const [notifications, setNotifications] = useState([]);
	const [loading, setLoading] = useState(true);

	async function fetchNotifications() {
		setLoading(true);
		const res = await fetch("/api/notifications");
		const data = await res.json();
		setNotifications(data.notifications || []);
		setLoading(false);
	}

	async function markAsRead(id) {
		await fetch("/api/notifications", {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ id }),
		});
		fetchNotifications();
	}

	useEffect(() => {
		fetchNotifications();
	}, []);

	if (loading) return <div>Loading...</div>;

	return (
		<div>
			<h1 className="text-2xl font-bold mb-6">Notifications</h1>
			<div className="flex flex-col gap-4">
				{notifications.length === 0 && <div className="text-gray-500">No notifications.</div>}
				{notifications.map((notif) => (
					<div key={notif._id} className={`rounded border p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between ${notif.read ? "bg-gray-100" : "bg-yellow-50"}`}>
						<div>
							<div className="font-semibold">{notif.title}</div>
							<div className="text-gray-600">{notif.message}</div>
							<div className="text-xs text-gray-400 mt-1">{new Date(notif.createdAt).toLocaleString()}</div>
						</div>
						{!notif.read && (
							<Button className="mt-2 md:mt-0" onClick={() => markAsRead(notif._id)}>
								Mark as Read
							</Button>
						)}
					</div>
				))}
			</div>
		</div>
	);
}