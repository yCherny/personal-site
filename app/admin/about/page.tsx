// Import Client Component
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import About from './about-page';
import { loadAboutSections } from '@/lib/about-api';

async function getData() {
	const { sections, filterOptions } = await loadAboutSections();
	return { sections, filterOptions };
}

export default async function Page() {
	const { sections, filterOptions } = await getData();
	const session = await getServerSession(authOptions);

	return (
		<About
			allSections={sections}
			allSectionFilters={filterOptions}
			session={session}
		/>
	);
}
