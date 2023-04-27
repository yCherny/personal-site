import Content from '@/interfaces/content';

export async function loadBlog() {
	const res = await fetch('http://localhost:3000/api/blog');
	const data = await res.json();
	const posts: Content[] = data.posts;
	const tags = posts.map((post) => post.tags).flat();
	const uniqueTags = Array.from(new Set(tags));
	return { posts, uniqueTags };
}
