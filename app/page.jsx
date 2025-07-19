import PatientForm from "@/components/forms/PatientForm";
import Link from "next/link";
import Image from "next/image";

export default function Home({ searchParams }) {
	// Simple admin modal logic (expand later)
	const isAdmin = searchParams?.admin === "true";

	return (
		<div className="flex h-screen max-h-screen">
			{/* Optional: Admin modal goes here if isAdmin */}
			<section className="remove-scrollbar container my-auto">
				<div className="sub-container max-w-[496px]">
					<Image
						src="/assets/icons/logo-full.svg"
						height={40}
						width={160}
						alt="iCare Tracker Logo"
						className="mb-4 h-10 w-fit"
					/>

					{/* Main patient registration form */}
					<PatientForm />

					<div className="text-14-regular mt-10 flex justify-between">
						<p className="text-dark-600 xl:text-left">© 2025 iCare Tracker</p>
						<Link href="/?admin=true" className="text-green-500">
							Admin
						</Link>
					</div>
				</div>
			</section>
			<Image
				src="/assets/images/onboarding-img.png"
				height={1000}
				width={1000}
				alt="Onboarding"
				className="side-img max-w-[50%]"
			/>
		</div>
	);
}