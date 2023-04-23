import { Fragment, useState } from 'react';
import Head from 'next/head';
import Header from '../../components/header/header';
import Content from '@/interfaces/content';
import FilterPanel from '@/components/filter/filter-panel';

import StickyNavBar from '@/components/layout/sticky-nav-bar';
import { GetServerSideProps } from 'next';
import { SkillsetDashboard } from '@/components/content/skillset-dashboard';
import { getAboutMeData } from '@/lib/aboutApi';
import Markdown from '@/components/sections/markdown';
import {
	AccordionList,
	Accordion,
	AccordionHeader,
	AccordionBody,
} from '@tremor/react';

import MasonryGrid, { DataType } from '@/components/layout/masonry-grid';

type Props = {
	allProjects: Content[];
	uniqueTags: string[];
	journey: [key: string];
	principles: [key: string];
};

function PortfolioPage({
	allProjects,
	uniqueTags,
	journey,
	principles,
}: Props) {
	return (
		<Fragment>
			<Head>
				<title>Yegor Chernyshev | Portfolio</title>
				<meta
					name='description'
					content='Various projects made by Yegor Chernyshev'
				/>
			</Head>
			<div className='max-w-7xl mx-auto min-h-screen'>
				<Header
					title={
						<h1>
							Portfol
							<span className='text-gray-400 dark:text-[#A59DB9]'>
								.io
							</span>
						</h1>
					}
					subtitle={'precious trinkets I made'}
				/>
				<StickyNavBar>
					<FilterPanel options={uniqueTags} path={'portfolio'} />
				</StickyNavBar>

				<div className='grid grid-cols-1 lg:grid-cols-3 mb-24 lg:gap-5'>
					<div className='flex flex-col col-span-1 lg:col-span-2'>
						<MasonryGrid
							type={DataType.Project}
							data={allProjects}
						/>
					</div>
					<div className='flex flex-col col-span-1 order-first lg:order-last py-5 gap-5'>
						<SkillsetDashboard />
						<AccordionList className='w-full'>
							<Accordion className='dark:bg-[#534670] border-none'>
								<AccordionHeader className='dark:text-white text-lg md:text-xl font-bold'>
									Software Engineering Journey
								</AccordionHeader>
								<AccordionBody>
									<Markdown content={journey['content']} />
								</AccordionBody>
							</Accordion>
							<Accordion className='dark:bg-[#534670] border-none'>
								<AccordionHeader className='dark:text-white text-lg md:text-xl font-bold'>
									Principles
								</AccordionHeader>
								<AccordionBody>
									<Markdown content={principles['content']} />
								</AccordionBody>
							</Accordion>
						</AccordionList>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export const getServerSideProps: GetServerSideProps<{ data: Data }> = async (
	context
) => {
	const journey = getAboutMeData('journey', ['content']);
	const principles = getAboutMeData('principles', ['content']);

	const res = await fetch('http://localhost:3000/api/portfolio');
	const data = await res.json();
	const projects: Content[] = data.projects;
	console.log(projects[0].title);

	const tags = projects.map((project) => project.tags).flat();
	const uniqueTags = Array.from(new Set(tags));

	if (!projects) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			allProjects: projects,
			uniqueTags: uniqueTags,
			journey,
			principles,
		},
	};
};

export default PortfolioPage;
