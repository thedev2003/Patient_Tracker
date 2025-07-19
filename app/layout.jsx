import "./globals.css";

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
				{children}
			</body>
		</html>
	);
}