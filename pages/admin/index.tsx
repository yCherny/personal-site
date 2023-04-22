import { getServerSession } from 'next-auth';
import { useEffect, useState } from 'react';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { useSession, getSession } from 'next-auth/react';
import { Card, Metric, Text, Flex, Grid, Title, BarList } from '@tremor/react';
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

			upvoteCount += post.upvotes ?? 0;
			downvoteCount += post.downvotes ?? 0;
			viewCount += post.views ?? 0;
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
	);
}

export async function getServerSideProps(context) {
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
}
