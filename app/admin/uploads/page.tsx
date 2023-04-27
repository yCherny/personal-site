import Uploads from './uploads-page';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import type { GetServerSidePropsContext } from 'next';
import { loadBlog } from '@/lib/blog-api';
import { loadPortfolio } from '@/lib/portfolio-api';

export default async function getServerSideProps(
	context: GetServerSidePropsContext
) {
	const { posts, uniqueTags: postTags } = await loadBlog();
	const { projects, uniqueTags: projectTags } = await loadPortfolio();
	const allContent = posts.concat(projects);
	const session = await getServerSession(authOptions);

	return (
		<Uploads
			allContent={allContent}
			allContentFilters={['blog', 'portfolio']}
			session={session}
		/>
	);
}
