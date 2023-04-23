import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { useSession, getSession } from 'next-auth/react';
import Navbar from '@/components/navigation/nav-bar';
import SideBar from '@/components/navigation/side-bar';
import DataFlow from '@/components/layout/data-flow';
import Content from '@/interfaces/content';
import Head from 'next/head';
import { Fragment, useState } from 'react';

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
		<Fragment>
			<Head>
				<title>Yegor Chernyshev | Uploads</title>
				<meta
					name='description'
					content='Uploads by Yegor Chernyshev'
				/>
			</Head>
			<div className='p-4 md:p-10 mx-auto max-w-7xl bg-white rounded-lg'>
				<Navbar user={'Jimmy'} />
				<div className='grid grid-cols-1 md:grid-cols-3 gap-10 mt-5'>
					<SideBar onClick={filterContent} />
					<div className='col-span-2'>
						<DataFlow
							content={
								filter === '' ? allContent : filteredContent
							}
						/>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export const getServerSideProps: GetServerSideProps<{ data: Data }> = async (
	context
) => {
	// Get Blogs
	const res = await fetch('http://localhost:3000/api/blog');
	const data = await res.json();
	const blogs: Content[] = data.posts;

	// Get Projects
	const resProject = await fetch('http://localhost:3000/api/portfolio');
	const projectData = await resProject.json();
	const projects: Content[] = projectData.projects;

	const allContent = blogs.concat(projects);

	if (!blogs && !projects) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			allContent: allContent,
			session: await getServerSession(
				context.req,
				context.res,
				authOptions
			),
		},
	};
};

export default Uploads;
