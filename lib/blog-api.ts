import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const postsDirectory = join(process.cwd(), '_posts');

export function getPostSlugs() {
	return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string, fields: string[] = []) {
	const realSlug = slug.replace(/\.md$/, '');

	// console.log(realSlug);

	const fullPath = join(postsDirectory, `${realSlug}.md`);
	// console.log(fullPath);

	const fileContents = fs.readFileSync(fullPath, 'utf8');
	const { data, content } = matter(fileContents);

	// console.log(data);

	type Items = {
		[key: string]: string;
	};

	const items: Items = {};

	// Ensure only the minimal needed data is exposed
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

export function getAllPosts(fields: string[] = []) {
	const slugs = getPostSlugs();
	// console.log(`Slug: ${slugs}`);
	const posts = slugs.map((slug) => getPostBySlug(slug, fields));
	// sort posts by date in descending order
	// .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

	// console.log(posts);
	return posts;
}

export function getFilteredPosts(tag: string) {
	const allPosts = getAllPosts([
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

	const tags = allPosts.map((post) => post['tags']).flat();
	const uniqueTags = Array.from(new Set(tags));

	let filteredPosts = allPosts.filter((post) => {
		const postTags = String(post['tags']).toLowerCase();
		return postTags.includes(tag);
	});

	return { response: filteredPosts, allTags: uniqueTags };
}

export async function loadBlog() {
	const res = await fetch('http://localhost:3000/api/blog');
	const data = await res.json();
	const posts: Content[] = data.posts;
	const tags = posts.map((post) => post.tags).flat();
	const uniqueTags = Array.from(new Set(tags));
	return { posts, uniqueTags };
}
