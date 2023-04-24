import { Fragment, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../../components/header/header';
import Markdown from '@/components/sections/markdown';
import DateFormatter from '@/components/layout/date-formatter';
import {
	AccordionList,
	Accordion,
	AccordionHeader,
	AccordionBody,
} from '@tremor/react';
import SectionContent from '@/interfaces/about';

type Props = {
	summary: SectionContent;
	sections: SectionContent[];
};

function AboutPage({ summary, sections }: Props) {
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
						<h1 className='flex flex-wrap'>
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
						<Markdown content={summary.content} />
						<AccordionList className='w-full'>
							{sections.map((section) => (
								<Accordion
									className='dark:bg-[#534670] border-none'
									key={section.title}
								>
									<AccordionHeader className='dark:text-white md:text-2xl font-bold'>
										{section.title}
									</AccordionHeader>
									<AccordionBody>
										<Markdown content={section.content} />
									</AccordionBody>
								</Accordion>
							))}
						</AccordionList>
						<p className='text-gray-400 dark:text-gray-500'>
							Pretty much slapped this together for the sake of
							deploying the website sooner. I will certainly come
							up with a more visually appealing way to talk about
							myself later. No one likes reading essays.
						</p>
						<div className='flex flex-col'>
							<h2 className='text-lg font-bold text-gray-400 dark:text-gray-500'>
								{`Created At: `}
								<DateFormatter
									dateString={'2023-04-22T15:28:36.548+00:00'}
								/>
							</h2>

							<h2 className='text-lg font-bold text-gray-500 dark:text-[#A59DB9]'>
								Last Updated:{' '}
								<DateFormatter
									dateString={'2023-04-22T15:28:36.548+00:00'}
								/>
							</h2>
						</div>
					</div>
					<div className='flex flex-col col-span-1 order-first sm:order-last'>
						<div className='flex flex-col border rounded-lg bg-white items-center p-5 gap-3 drop-shadow-md'>
							<h3 className='font-bold dark:text-black'>
								Yegor Chernyshev
							</h3>
							<Image
								alt='Image of Yegor Chernyshev'
								src='/assets/me_full.jpg'
								width={300}
								height={800}
								className='rounded-md'
							/>
							<p className='text-gray-500 text-md'>
								A photo of Yegor in 2023
							</p>
							<table className='table-auto border-separate border-spacing-4'>
								<tbody>
									<tr className='align-top'>
										<td className='font-semibold'>Born</td>
										<td>July 1997</td>
									</tr>
									<tr className='align-top'>
										<td className='font-semibold'>
											Education
										</td>
										<td>
											Baruch College (BA) New York
											University (MS)
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
			</div>
		</Fragment>
	);
}

import { loadAboutSections } from '@/lib/about-api';

export async function getStaticProps() {
	const { sections, filterOptions } = await loadAboutSections();
	const summary = sections.filter((section) => section.title === 'Summary');
	const aboutSections = sections.filter(
		(section) => section.page === 'about' && section.title !== 'Summary'
	);

	return {
		props: {
			summary: summary[0],
			sections: aboutSections,
		},
	};
}

export default AboutPage;
