"use client";
import { useEffect, useState } from "react";

export default function PatientNotifications({ patientId }) {
	const [notifications, setNotifications] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!patientId) return;
		setLoading(true);
		fetch(`/api/notifications?patient=${patientId}`)
			.then((res) => res.json())
			.then((data) => {
				setNotifications(data.notifications || []);
				setLoading(false);
			});
	}, [patientId]);

	if (!patientId) return null;
	if (loading) return <div>Loading...</div>;

	return (
		<div>
			<h2 className="text-xl font-semibold mb-4">Your Notifications</h2>
			<div className="flex flex-col gap-3">
				{notifications.length === 0 && (
					<div className="text-gray-500">No notifications.</div>
				)}
				{notifications.map((notif) => (
					<div
						key={notif._id}
						className={`p-4 rounded shadow bg-white border ${notif.read ? "opacity-60" : "border-blue-300"}`}
					>
						<div className="font-medium">{notif.title}</div>
						<div className="text-gray-700">{notif.message}</div>
						<div className="text-xs text-gray-400 mt-1">
							{new Date(notif.createdAt).toLocaleString()}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}