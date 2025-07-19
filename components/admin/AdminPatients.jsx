"use client";
import { useEffect, useState } from "react";
import { Loader } from "@/components/ui/Loader";

export default function AdminPatients() {
	const [patients, setPatients] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchPatients() {
			setLoading(true);
			const res = await fetch("/api/patient");
			const data = await res.json();
			setPatients(data.patients || []);
			setLoading(false);
		}
		fetchPatients();
	}, []);

	if (loading) return <Loader />;

	return (
		<div>
			<h1 className="text-2xl font-bold mb-6">Patients</h1>
			<div className="overflow-x-auto rounded shadow bg-white">
				<table className="min-w-full table-auto">
					<thead>
						<tr className="bg-gray-100">
							<th className="px-4 py-2 text-left">Name</th>
							<th className="px-4 py-2 text-left">Email</th>
							<th className="px-4 py-2 text-left">Age</th>
							<th className="px-4 py-2 text-left">Gender</th>
							<th className="px-4 py-2 text-left">Registered</th>
						</tr>
					</thead>
					<tbody>
						{patients.map((p) => (
							<tr key={p._id} className="border-b">
								<td className="px-4 py-2">{p.name}</td>
								<td className="px-4 py-2">{p.email}</td>
								<td className="px-4 py-2">{p.age}</td>
								<td className="px-4 py-2">{p.gender}</td>
								<td className="px-4 py-2 text-xs text-gray-500">{new Date(p.createdAt).toLocaleString()}</td>
							</tr>
						))}
						{patients.length === 0 && (
							<tr>
								<td colSpan={5} className="px-4 py-2 text-gray-500 text-center">No patients found.</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}