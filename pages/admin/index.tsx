import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { useSession, getSession } from 'next-auth/react';
import { Card, Metric, Text, Flex, Grid, Title, BarList } from '@tremor/react';
import Navbar from '@/components/navigation/nav-bar';

export default function Dashboard() {
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
									<Metric>2</Metric>
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
									<Metric>4</Metric>
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
									<Metric>2</Metric>
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
									<Metric>4</Metric>
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
									<Metric>2</Metric>
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
	return {
		props: {
			session: await getServerSession(
				context.req,
				context.res,
				authOptions
			),
		},
	};
}
