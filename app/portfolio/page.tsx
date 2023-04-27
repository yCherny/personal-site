import PortfolioPage from './portfolio-page';
import { loadPortfolio } from '@/lib/portfolio-api';
import { loadSkillset } from '@/lib/skill-api';
import { loadAboutSections } from '@/lib/about-api';

async function getProjects() {
	const { sections, filterOptions } = await loadAboutSections();
	const { projects, uniqueTags } = await loadPortfolio();
	const { skills, skillFilters } = await loadSkillset();
	const programmingSections = sections.filter(
		(section) => section.page === 'portfolio'
	);

	return { projects, skills, uniqueTags, programmingSections };
}

export default async function Page() {
	const { projects, skills, uniqueTags, programmingSections } =
		await getProjects();
	return (
		<PortfolioPage
			allProjects={projects}
			allSkills={skills}
			uniqueTags={uniqueTags}
			sections={programmingSections}
		/>
	);
}
