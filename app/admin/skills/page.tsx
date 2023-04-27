import Skills from './skills-page';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { loadSkillset } from '@/lib/skill-api';
import type { GetServerSidePropsContext } from 'next';

export default async function getServerSideProps(
	context: GetServerSidePropsContext
) {
	const { skills, skillFilters } = await loadSkillset();
	const session = await getServerSession(authOptions);

	return (
		<Skills
			allSkills={skills}
			allSkillFilters={skillFilters}
			session={session}
		/>
	);
}
