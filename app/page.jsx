import PatientForm from "@/components/forms/PatientForm";

export default function HomePage() {
	return (
		<main className="flex items-center justify-center min-h-screen bg-gray-50">
			<div>
				<h1 className="text-2xl font-bold mb-6 text-center">Register New Patient</h1>
				<PatientForm />
			</div>
		</main>
	);
}