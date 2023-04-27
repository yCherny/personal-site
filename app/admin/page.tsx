// Import Client Component
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import Dashboard from './dashboard';
import { loadAboutSections } from '@/lib/about-api';
import { loadBlog } from '@/lib/blog-api';
import { loadPortfolio } from '@/lib/portfolio-api';
import { loadSkillset } from '@/lib/skill-api';
import type { GetServerSidePropsContext } from 'next';

async function getData() {
	const { sections } = await loadAboutSections();
	const { posts } = await loadBlog();
	const { projects } = await loadPortfolio();
	const { skills } = await loadSkillset();
	const allContent = posts.concat(projects);

	return { allContent, sections, skills };
}

export default async function Page(context: GetServerSidePropsContext) {
	const { allContent, sections, skills } = await getData();
	const session = await getServerSession(authOptions);

	return (
		<Dashboard
			allContent={allContent}
			allSections={sections}
			allSkills={skills}
			session={session}
		/>
	);
}
