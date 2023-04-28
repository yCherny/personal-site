// Import Client Component
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import About from './contact-page';

export default async function Page() {
	const session = await getServerSession(authOptions);

	return <About session={session} />;
}
