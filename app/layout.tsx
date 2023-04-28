'use client';

import NavigationBar from '@/components/navigation/navigation';
import '@/styles/globals.css';
import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';

export const metadata = {
	title: 'Home',
	description: 'Welcome home',
};

export default function RootLayout({
	// Layouts must accept a children prop.
	// This will be populated with nested layouts or pages
	children,
	session,
}: {
	children: React.ReactNode;
	session: Session;
}) {
	return (
		<html lang='en' className='dark'>
			<head>
				<link
					href='https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap'
					rel='stylesheet'
				/>
				<link
					rel='stylesheet'
					href='https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css'
				/>
			</head>
			<body className='dark:bg-[#130F29]'>
				<ThemeProvider attribute='class'>
					<div className='p-7 md:p-10'>
						<SessionProvider session={session}>
							{children}
						</SessionProvider>
					</div>
					<NavigationBar />
				</ThemeProvider>
			</body>
		</html>
	);
}
