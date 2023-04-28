// Import Client Component
import AboutPage from './about-page';
import { loadAboutSections } from '@/lib/about-api';

async function getAboutData() {
	const { sections } = await loadAboutSections();
	const summary = sections.filter((section) => section.title === 'Summary');
	const aboutSections = sections.filter(
		(section) => section.page === 'about' && section.title !== 'Summary'
	);

	return { summary, aboutSections };
}

export default async function Page() {
	const { summary, aboutSections } = await getAboutData();
	return <AboutPage summary={summary[0]} sections={aboutSections} />;
}
