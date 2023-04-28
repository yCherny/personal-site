'use client';

import { Fragment, useState } from 'react';
import Head from 'next/head';
import Header from '../../components/header/header';
import Content from '@/interfaces/content';
import SkillContent from '@/interfaces/skill';
import FilterPanel from '@/components/filter/filter-panel';
import SectionContent from '@/interfaces/about';
import StickyNavBar from '@/components/layout/sticky-nav-bar';
import { SkillsetDashboard } from '@/components/content/skillset-dashboard';
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
	allSkills: SkillContent[];
	uniqueTags: string[];
	sections: SectionContent[];
};

function PortfolioPage({
	allProjects,
	allSkills,
	uniqueTags,
	sections,
}: Props) {
	const [filteredContent, setFilteredContent] =
		useState<Content[]>(allProjects);
	const [filter, setFilter] = useState<string>('');

	function filterContent(type: string) {
		if (type === filter) {
			setFilter('');
		} else {
			const filteredContent = allProjects.filter((data) =>
				data.tags.includes(type)
			);
			setFilter(type);
			setFilteredContent(filteredContent);
		}
	}

	return (
		<Fragment>
			<div className='max-w-7xl mx-auto min-h-screen'>
				<Header
					titlePrimary={'Portfol'}
					titleSecondary={'.io'}
					subtitle={'precious trinkets I made'}
				/>
				<StickyNavBar>
					<FilterPanel
						onClick={filterContent}
						filterOptions={uniqueTags}
						path={'portfolio'}
					/>
				</StickyNavBar>

				<div className='grid grid-cols-1 lg:grid-cols-3 lg:gap-5'>
					<div className='flex flex-col col-span-1 lg:col-span-2'>
						<MasonryGrid
							type={DataType.Project}
							data={filter === '' ? allProjects : filteredContent}
						/>
					</div>
					<div className='flex flex-col col-span-1 order-first lg:order-last pt-5 gap-5'>
						<SkillsetDashboard skills={allSkills} />
						<AccordionList className='w-full'>
							{sections.map((section, index) => (
								<Accordion
									className={
										index === 0
											? 'border-x-0 border-t-0 border-b-[#413D57] dark:bg-[#534670]'
											: 'border-none dark:bg-[#534670]'
									}
									key={section.title}
								>
									<AccordionHeader className='dark:text-white text-left text-lg md:text-xl font-bold'>
										{section.title}
									</AccordionHeader>
									<AccordionBody>
										<Markdown content={section.content} />
									</AccordionBody>
								</Accordion>
							))}
						</AccordionList>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default PortfolioPage;
