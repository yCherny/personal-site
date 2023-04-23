import { getServerSession } from 'next-auth';
import { Fragment, useEffect, useState } from 'react';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { useSession, getSession } from 'next-auth/react';
import { Card, Metric, Text, Flex, Grid, Title, BarList } from '@tremor/react';
import Head from 'next/head';
import Navbar from '@/components/navigation/nav-bar';
import Content from '@/interfaces/content';

type Props = {
	allContent: Content[];
};

export default function Dashboard({ allContent }: Props) {
	const [blogCount, setBlogCount] = useState<number>(0);
	const [projectCount, setProjectCount] = useState<number>(0);
	const [viewCount, setViewCount] = useState<number>(0);
	const [upvoteCount, setUpvoteCount] = useState<number>(0);
	const [downvoteCount, setDownvoteCount] = useState<number>(0);

	useEffect(() => {
		let blogCount = 0;
		let projectCount = 0;
		let upvoteCount = 0;
		let downvoteCount = 0;
		let viewCount = 0;

		for (let post of allContent) {
			if (post.type === 'blog') {
				blogCount += 1;
			} else {
				projectCount += 1;
			}

			upvoteCount += post.upvotes?.length ?? 0;
			downvoteCount += post.downvotes?.length ?? 0;
			viewCount += post.views?.length ?? 0;
		}

		setBlogCount(blogCount);
		setProjectCount(projectCount);
		setUpvoteCount(upvoteCount);
		setDownvoteCount(downvoteCount);
		setViewCount(viewCount);
	}, []);

	const { data: session, status } = useSession();
	if (status === 'loading') {
		return <h1>Loading...</h1>;
	}

	if (status === 'unauthenticated') {
		return <h1>Access Denied</h1>;
	}

	if (typeof window === 'undefined') return null;

	return (
		<Fragment>
			<Head>
				<title>Yegor Chernyshev | Admin</title>
				<meta name='description' content='Admin dashboard' />
			</Head>
			<main className='p-4 md:p-10 mx-auto max-w-7xl bg-white rounded-lg'>
				<Navbar user={'Jimmy'} />
				<div className='flex flex-col gap-5 mt-5'>
					<Title className='font-black text-4xl'>Dashboard</Title>
					<div className='flex flex-col gap-5'>
						<div className='flex flex-col border border-gray-400 rounded-lg p-5 gap-3'>
							<Title className='font-black'>Content</Title>
							<div className='flex flex-row gap-5'>
								<Card>
									<Flex alignItems='start'>
										<Text>Blog Posts</Text>
									</Flex>
									<Flex
										className='space-x-3 truncate'
										justifyContent='start'
										alignItems='baseline'
									>
										<Metric>{blogCount}</Metric>
									</Flex>
								</Card>
								<Card>
									<Flex alignItems='start'>
										<Text>Projects</Text>
									</Flex>
									<Flex
										className='space-x-3 truncate'
										justifyContent='start'
										alignItems='baseline'
									>
										<Metric>{projectCount}</Metric>
									</Flex>
								</Card>
							</div>
						</div>

						<div className='flex flex-col border border-gray-400 rounded-lg p-5 gap-3'>
							<Title className='font-black'>Metrics</Title>
							<div className='flex flex-row gap-5'>
								<Card>
									<Flex alignItems='start'>
										<Text>Views</Text>
									</Flex>
									<Flex
										className='space-x-3 truncate'
										justifyContent='start'
										alignItems='baseline'
									>
										<Metric>{viewCount}</Metric>
									</Flex>
								</Card>
								<Card>
									<Flex alignItems='start'>
										<Text>Upvotes</Text>
									</Flex>
									<Flex
										className='space-x-3 truncate'
										justifyContent='start'
										alignItems='baseline'
									>
										<Metric>{upvoteCount}</Metric>
									</Flex>
								</Card>
								<Card>
									<Flex alignItems='start'>
										<Text>Downvotes</Text>
									</Flex>
									<Flex
										className='space-x-3 truncate'
										justifyContent='start'
										alignItems='baseline'
									>
										<Metric>{downvoteCount}</Metric>
									</Flex>
								</Card>
							</div>
						</div>
					</div>
				</div>
			</main>
		</Fragment>
	);
}

export async function getServerSideProps(context) {
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
}
