import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { useSession, getSession } from 'next-auth/react';
import Navbar from '@/components/navigation/nav-bar';
import SideBar from '@/components/navigation/side-bar';
import DataFlow from '@/components/layout/data-flow';
import Content from '@/interfaces/content';
import { useState } from 'react';

type Props = {
	allContent: Content[];
};

function Uploads({ allContent }: Props) {
	const [filteredContent, setFilteredContent] =
		useState<Content[]>(allContent);
	const [filter, setFilter] = useState<string>('');

	const { data: session, status } = useSession();
	if (status === 'loading') {
		return <h1>Loading...</h1>;
	}

	if (status === 'unauthenticated') {
		return <h1>Access Denied</h1>;
	}

	if (typeof window === 'undefined') return null;
	function filterContent(type: string) {
		if (type === filter) {
			setFilter('');
		} else {
			const filteredContent = allContent.filter(
				(data) => data.type === type
			);
			setFilter(type);
			setFilteredContent(filteredContent);
		}
	}

	return (
		<div className='p-4 md:p-10 mx-auto max-w-7xl bg-white rounded-lg'>
			<Navbar user={'Jimmy'} />
			<div className='grid grid-cols-1 md:grid-cols-3 gap-10 mt-5'>
				<SideBar onClick={filterContent} />
				<div className='col-span-2'>
					<DataFlow
						content={filter === '' ? allContent : filteredContent}
					/>
				</div>
			</div>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps<{ data: Data }> = async (
	context
) => {
	try {
		const res = await fetch('http://localhost:3000/api/blog');
		const data = await res.json();
		const posts = data.posts;
		console.log(posts[0].createdAt);

		if (!data) {
			return {
				notFound: true,
			};
		}

		return {
			props: {
				allContent: posts,
				session: await getServerSession(
					context.req,
					context.res,
					authOptions
				),
			},
		};
	} catch (err) {
		console.log(`Error: ${err}`);
	}
};

export default Uploads;
