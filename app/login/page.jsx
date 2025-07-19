import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="bg-white p-6 rounded shadow w-full max-w-md">
				<h1 className="text-2xl font-bold mb-4">Login</h1>
				<LoginForm />
			</div>
		</div>
	);
}