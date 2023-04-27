// Import Client Component
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import About from './contact-page';
import type { GetServerSidePropsContext } from 'next';

export default async function Page(context: GetServerSidePropsContext) {
	const session = await getServerSession(authOptions);

	return <About session={session} />;
}
