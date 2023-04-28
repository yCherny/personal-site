import Skills from './skills-page';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { loadSkillset } from '@/lib/skill-api';

export const metadata = {
	title: 'Admin | Skills',
};

export default async function getServerSideProps() {
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
