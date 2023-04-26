import Content from '@/interfaces/content';

export async function loadPortfolio() {
	const res = await fetch('http://192.168.1.169:3000/api/portfolio');
	const data = await res.json();
	const projects: Content[] = data.projects;
	const tags = projects.map((project) => project.tags).flat();
	const uniqueTags = Array.from(new Set(tags));
	return { projects, uniqueTags };
}
