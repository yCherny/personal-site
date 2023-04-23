import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import { Fragment, useEffect, useState } from 'react';
import { Card, Metric, Text, Flex, Grid, Title, BarList } from '@tremor/react';
import Head from 'next/head';
import Navbar from '@/components/navigation/nav-bar';
import Content from '@/interfaces/content';

import type { GetServerSidePropsContext } from 'next';
import type { Session } from 'next-auth';

type Props = {
	allContent: Content[];
	session: Session;
};

export default function Dashboard({ allContent, session }: Props) {
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

	return (
		<Fragment>
			<Head>
				<title>Yegor Chernyshev | Admin</title>
				<meta name='description' content='Admin dashboard' />
			</Head>
			<main className='p-4 md:p-10 mx-auto max-w-7xl bg-white rounded-lg'>
				<Navbar user={'Yegor'} />
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
								<Card decoration='top' decorationColor='gray'>
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
								<Card decoration='top' decorationColor='green'>
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
								<Card decoration='top' decorationColor='red'>
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

import { loadBlog } from '@/lib/blog-api';
import { loadPortfolio } from '@/lib/portfolio-api';

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { posts, uniqueTags: postTags } = await loadBlog();
	const { projects, uniqueTags: projectTags } = await loadPortfolio();
	const allContent = posts.concat(projects);

	if (!posts && !projects) {
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
