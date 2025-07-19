import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="bg-white p-6 rounded shadow w-full max-w-md">
				<h1 className="text-2xl font-bold mb-4">Register</h1>
				<RegisterForm />
			</div>
		</div>
	);
}