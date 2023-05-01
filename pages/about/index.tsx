import { Fragment } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../../components/header/header';
import Markdown from '@/components/sections/markdown';
import {
	AccordionList,
	Accordion,
	AccordionHeader,
	AccordionBody,
} from '@tremor/react';
import SectionContent, { Section } from '@/interfaces/about';
import mongoose from 'mongoose';

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
					titlePrimary={'wiki/'}
					titleSecondary={'Yegor-Chernyshev'}
					subtitle={
						"Not important enough to have a Wikipedia article written about me. Guess I'll have to do it myself."
					}
				/>
				<div className='grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-20'>
					<div className='flex flex-col gap-4 col-span-1 md:col-span-2'>
						<Markdown content={summary.content} />
						<AccordionList className='w-full'>
							{sections.map((section) => (
								<Accordion
									className='dark:bg-[#534670] border-none rounded-md'
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
					</div>
					<div className='flex flex-col col-span-1 order-first sm:order-last'>
						<div className='flex flex-col border rounded-lg bg-white items-center p-5 gap-3 drop-shadow-md'>
							<h3 className='font-bold dark:text-black'>
								Yegor Chernyshev
							</h3>
							<Image
								alt='Image of Yegor Chernyshev'
								src='https://firebasestorage.googleapis.com/v0/b/yegor-codes.appspot.com/o/me_full.jpg?alt=media&token=23d776c6-817e-4faf-bf7e-ee072c819550'
								width={300}
								height={800}
								className='rounded-md'
								priority
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

export async function getStaticProps() {
	let client = await mongoose.connect(process.env.MONGO_INSTANCE as string);
	const sections = await Section.find();
	client.connection.close();

	const jsonSections: SectionContent[] = JSON.parse(JSON.stringify(sections));
	const summary = jsonSections.filter(
		(section) => section.title === 'Summary'
	)[0];
	const aboutSections = jsonSections.filter(
		(section) => section.page === 'about' && section.title !== 'Summary'
	);

	return {
		props: {
			summary: summary,
			sections: aboutSections,
		},
	};
}

export default AboutPage;
