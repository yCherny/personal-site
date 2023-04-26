import SectionContent from '@/interfaces/about';

export async function loadAboutSections() {
	const res = await fetch('http://192.168.1.169:3000/api/about');
	const data = await res.json();
	const sections: SectionContent[] = data.sections;
	const pageTypes = sections.map((section) => section.page).flat();
	const filterOptions = Array.from(new Set(pageTypes));

	return { sections, filterOptions };
}
