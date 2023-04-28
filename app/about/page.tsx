// Import Client Component
import AboutPage from './about-page';
import { loadAboutSections } from '@/lib/about-api';

export const metadata = {
	title: 'About',
	description: 'A page about Yegor Chernyshev',
};

async function getPosts() {
	const { sections } = await loadAboutSections();
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
