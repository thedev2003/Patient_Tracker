export default function AdminDashboard() {
	return (
		<section>
			<h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="bg-white rounded shadow p-6">
					<div className="text-xl font-semibold">Patients</div>
					<div className="text-3xl mt-2">--</div>
				</div>
				<div className="bg-white rounded shadow p-6">
					<div className="text-xl font-semibold">Notifications</div>
					<div className="text-3xl mt-2">--</div>
				</div>
				<div className="bg-white rounded shadow p-6">
					<div className="text-xl font-semibold">System Status</div>
					<div className="text-3xl mt-2">OK</div>
				</div>
			</div>
		</section>
	);
}