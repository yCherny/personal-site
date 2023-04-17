import { Fragment, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../../components/header/header';
import Markdown from '@/components/sections/markdown';
import { getAboutMeData } from '@/lib/aboutApi';

type Props = {
	data: [key: string];
};

function AboutPage({ data }: Props) {
	return (
		<Fragment>
			<Head>
				<title>Yegor Chernyshev | About</title>
				<meta
					name='description'
					content='A page about Yegor Chernyshev'
				/>
			</Head>
			<div className='max-w-6xl mx-auto min-h-screen'>
				<Header
					title={
						<h1>
							<span className='text-gray-400 dark:text-[#A59DB9]'>
								wiki/
							</span>
							Yegor
							<span className='text-gray-400 dark:text-[#A59DB9]'>
								_
							</span>
							Chernyshev
						</h1>
					}
					subtitle={
						"Not important enough to have a Wikipedia article written about me. Guess I'll have to do it myself."
					}
				/>
				<div className='grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-24'>
					<div className='flex flex-col gap-4 col-span-1 md:col-span-2'>
						<Markdown content={data['content']} />
					</div>
					<div className='flex flex-col col-span-1 border-gray-500 border items-center p-5 gap-3 order-first sm:order-last'>
						<h3 className='font-bold dark:text-white'>
							Yegor Chernyshev
						</h3>
						<Image
							alt='Image of Yegor Chernyshev'
							src='/assets/me_full.jpg'
							width={300}
							height={800}
						/>
						<p className='text-gray-500 text-md'>
							A photo of Yegor in 2023
						</p>
						<table className='table-auto dark:text-white border-separate border-spacing-4'>
							<tbody>
								<tr className='align-top'>
									<td className='font-semibold'>Born</td>
									<td>July 1997</td>
								</tr>
								<tr className='align-top'>
									<td className='font-semibold'>Education</td>
									<td>
										Baruch College (BA) New York University
										(MS)
									</td>
								</tr>
								<tr className='align-top'>
									<td className='font-semibold'>
										Occupations
									</td>
									<td>
										Software engineer, lifelong learner,
										night-owl
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export async function getStaticProps() {
	const data = getAboutMeData(['content', 'createdDate', 'editedDate']);

	return {
		props: {
			data: {
				...data,
			},
		},
	};
}

export default AboutPage;
