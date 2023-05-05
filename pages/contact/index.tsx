import { Fragment } from 'react';
import Head from 'next/head';
import Header from '../../components/header/header';
import { useRouter } from 'next/router';
import { Button, Metric } from '@tremor/react';

function ContactPage() {
	const router = useRouter();

	return (
		<Fragment>
			<Head>
				<title>Yegor Chernyshev | Contact</title>
				<meta
					name='description'
					content='Contact Yegor Chernyshev'
					key={'desc'}
				/>
				<meta
					property='og:title'
					content='Yegor Chernyshev | Contact'
				/>
				<meta
					property='og:description'
					content='Contact Yegor Chernyshev'
				/>
				<meta property='og:url' content='https://yegor.codes/contact' />
			</Head>
			<div className='max-w-7xl mx-auto mb-20'>
				<Header
					titlePrimary={'Cont'}
					titleSecondary={'act'}
					subtitle={'ground control to major Tom'}
				/>

				<div className='grid grid-cols-1 md:grid-cols-2'>
					<div className='flex flex-col gap-4 p-5 items-start bg-white dark:bg-[#1B1637] rounded-md'>
						<Metric className='dark:text-gray-300'>
							Reach Out
						</Metric>
						<Button
							className='bg-black border-none dark:bg-white dark:text-black font-bold'
							onClick={() =>
								router.push('mailto:hello@yegor.codes')
							}
						>
							hello@yegor.codes
						</Button>
						<Button
							className='bg-black border-none dark:bg-white dark:text-black font-bold'
							onClick={() =>
								router.push(
									'https://www.linkedin.com/in/yeg-ch/'
								)
							}
						>
							LinkedIn
						</Button>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default ContactPage;
