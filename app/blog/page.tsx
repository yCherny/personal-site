import BlogPage from './blog-page';
import { loadBlog } from '@/lib/blog-api';

async function getPosts() {
	const { posts, uniqueTags } = await loadBlog();
	return { posts, uniqueTags };
}

export default async function Page() {
	const { posts: allPosts, uniqueTags } = await getPosts();
	return <BlogPage allPosts={allPosts} uniqueTags={uniqueTags} />;
}
