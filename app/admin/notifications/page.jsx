import { useEffect, useState } from "react";
import AdminNotifications from "@/components/admin/AdminNotifications";
import SendNotificationForm from "@/components/admin/SendNotificationForm";

export default function AdminNotificationsPage() {
	const [patients, setPatients] = useState([]);

	useEffect(() => {
		fetch("/api/patient")
			.then(res => res.json())
			.then(data => setPatients(data.patients || []));
	}, []);

	return (
		<div className="flex flex-col gap-8">
			<AdminNotifications />
			<SendNotificationForm patients={patients} />
		</div>
	);
}