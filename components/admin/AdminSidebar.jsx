import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
	{ href: "/admin", label: "Dashboard" },
	{ href: "/admin/patients", label: "Patients" },
	{ href: "/admin/notifications", label: "Notifications" },
	{ href: "/admin/settings", label: "Settings" },
];

export default function AdminSidebar() {
	const pathname = usePathname?.() ?? "";

	return (
		<aside className="min-w-[220px] bg-slate-800 text-white flex flex-col py-8">
			<div className="text-xl font-bold px-6 mb-8">Admin Panel</div>
			<nav className="flex flex-col gap-1">
				{links.map((link) => (
					<Link
						key={link.href}
						href={link.href}
						className={`block px-6 py-3 border-b border-slate-700 ${pathname === link.href
								? "bg-slate-700 font-semibold"
								: "hover:bg-slate-700"
							}`}
					>
						{link.label}
					</Link>
				))}
			</nav>
		</aside>
	);
}