import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const projectDirectory = join(process.cwd(), '_projects');

export function getProjectSlugs() {
	return fs.readdirSync(projectDirectory);
}

export function getProjectBySlug(slug: string, fields: string[] = []) {
	const realSlug = slug.replace(/\.md$/, '');
	const fullPath = join(projectDirectory, `${realSlug}.md`);
	const fileContents = fs.readFileSync(fullPath, 'utf8');
	const { data, content } = matter(fileContents);

	type Items = {
		[key: string]: string;
	};

	const items: Items = {};

	fields.forEach((field) => {
		if (field === 'slug') {
			items[field] = realSlug;
		}
		if (field === 'content') {
			items[field] = content;
		}

		if (typeof data[field] !== 'undefined') {
			items[field] = data[field];
		}
	});

	return items;
}

export function getAllProjects(fields: string[] = []) {
	const slugs = getProjectSlugs();
	console.log(`Slug: ${slugs}`);
	const projects = slugs.map((slug) => getProjectBySlug(slug, fields));
	// sort posts by date in descending order
	// .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
	return projects;
}

export function getFilteredProjects(tag: string) {
	const allProjects = getAllProjects([
		'slug',
		'createdDate',
		'editedDate',
		'title',
		'excerpt',
		'tags',
		'color',
		'coverImage',
		'authors',
	]);

	const tags = allProjects.map((project) => project['tags']).flat();
	const uniqueTags = Array.from(new Set(tags));

	let filteredProjects = allProjects.filter((project) => {
		const projectTags = String(project['tags']).toLowerCase();
		return projectTags.includes(tag);
	});

	return { response: filteredProjects, allTags: uniqueTags };
}

export async function loadPortfolio() {
	const res = await fetch('http://localhost:3000/api/portfolio');
	const data = await res.json();
	const projects: Content[] = data.projects;
	const tags = projects.map((project) => project.tags).flat();
	const uniqueTags = Array.from(new Set(tags));
	return { projects, uniqueTags };
}


