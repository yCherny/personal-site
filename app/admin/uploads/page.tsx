import Uploads from './uploads-page';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { loadBlog } from '@/lib/blog-api';
import { loadPortfolio } from '@/lib/portfolio-api';

export const metadata = {
	title: 'Admin | Uploads',
};

export default async function getServerSideProps() {
	const { posts } = await loadBlog();
	const { projects } = await loadPortfolio();
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
