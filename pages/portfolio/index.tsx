import { Fragment, useState } from 'react';
import Head from 'next/head';
import Header from '../../components/header/header';
import Content, { Post } from '@/interfaces/content';
import SkillContent, { Skill } from '@/interfaces/skill';
import FilterPanel from '@/components/filter/filter-panel';
import SectionContent, { Section } from '@/interfaces/about';
import StickyNavBar from '@/components/layout/sticky-nav-bar';
import { SkillsetDashboard } from '@/components/content/skillset-dashboard';
import Markdown from '@/components/sections/markdown';
import {
	AccordionList,
	Accordion,
	AccordionHeader,
	AccordionBody,
	Button,
} from '@tremor/react';
import { useTheme } from 'next-themes';

import MasonryGrid, { DataType } from '@/components/layout/masonry-grid';
import mongoose from 'mongoose';
import { useRouter } from 'next/router';

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
	const router = useRouter();
	const { theme, setTheme } = useTheme();
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
			<Head>
				<title>Yegor Chernyshev | Portfolio</title>
				<meta
					name='description'
					content='Various projects made by Yegor Chernyshev'
					key={'desc'}
				/>
				<meta
					property='og:title'
					content='Yegor Chernyshev | Portfolio'
				/>
				<meta
					property='og:description'
					content='Various projects made by Yegor Chernyshev'
				/>
				<meta
					property='og:url'
					content='https://yegor.codes/portfolio'
				/>
			</Head>
			<div className='max-w-7xl mx-auto'>
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

						<button
							className='bg-white dark:bg-[#2F2050] rounded-lg text-black dark:text-white font-bold flex flex-col items-center p-3 drop-shadow-lg transition duration-500 hover:scale-105'
							onClick={() =>
								router.push('https://github.com/yCherny')
							}
						>
							<div className='flex items-center gap-4'>
								<img
									src={
										theme === 'dark'
											? `assets/github-mark-white.png`
											: `assets/github-mark.png`
									}
									height={25}
									width={25}
								/>
								GitHub
							</div>
						</button>
						<AccordionList className='w-full'>
							{sections.map((section, index) => (
								<Accordion
									className={
										index === 0
											? 'border-x-0 border-t-0 border-b-[#413D57] dark:bg-[#534670]'
											: 'border-none dark:bg-[#534670]'
									}
									key={index}
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

export async function getStaticProps() {
	let client = await mongoose.connect(process.env.MONGO_INSTANCE as string);

	// Get Portfolio Content
	const query = Post.where({ type: 'portfolio' });
	const projects = await query.find();
	const jsonProjects = JSON.parse(JSON.stringify(projects));
	const tags = projects.map((post) => post.tags).flat();
	const uniqueTags = Array.from(new Set(tags));

	// Get Skills
	const skills = await Skill.find();
	const jsonSkills = JSON.parse(JSON.stringify(skills));

	// Get Sections
	const sections = await Section.find();
	const programmingSections = sections.filter(
		(section) => section.page === 'portfolio'
	);
	const jsonSections = JSON.parse(JSON.stringify(programmingSections));

	client.connection.close();

	if (!projects) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			allProjects: jsonProjects,
			allSkills: jsonSkills,
			uniqueTags: uniqueTags,
			sections: jsonSections,
		},
	};
}

export default PortfolioPage;
