import NavigationBar from '@/components/navigation/navigation';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';
import Head from 'next/head';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		if (theme === 'light') {
			return setTheme('light');
		}
		return setTheme('dark');
	}, []);

	return (
		<>
			<Head>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0, viewport-fit=cover'
				/>
				<meta
					property='og:image'
					content='https://firebasestorage.googleapis.com/v0/b/yegor-codes.appspot.com/o/og-image.png?alt=media&token=7d7a3894-0a47-4879-bcb4-7f1da44a98ed'
				/>
				<meta name='robots' content='noarchive' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<ThemeProvider attribute='class'>
				<div className='p-7 md:p-10'>
					<SessionProvider session={session}>
						<Component {...pageProps} />
					</SessionProvider>
				</div>
				<NavigationBar />
			</ThemeProvider>
		</>
	);
}
