// Import Client Component
import AboutPage from '../../components/pages/about-page';
import { loadAboutSections } from '@/lib/about-api';

async function getPosts() {
	const { sections, filterOptions } = await loadAboutSections();
	const summary = sections.filter((section) => section.title === 'Summary');
	const aboutSections = sections.filter(
		(section) => section.page === 'about' && section.title !== 'Summary'
	);

	return { summary, aboutSections };
}

export default async function Page() {
	// Fetch data directly in the Server Component
	const { summary, aboutSections } = await getPosts();
	// Forward fetched data to your Client Component
	return <AboutPage summary={summary[0]} sections={aboutSections} />;
}
