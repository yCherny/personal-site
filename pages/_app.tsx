import NavigationBar from '@/components/navigation/navigation';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';

import type { Session } from 'next-auth';

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
	return (
		<ThemeProvider attribute='class'>
			<div className='p-7 md:p-10'>
				<SessionProvider session={session}>
					<Component {...pageProps} />
				</SessionProvider>
			</div>
			<NavigationBar />
		</ThemeProvider>
	);
}
