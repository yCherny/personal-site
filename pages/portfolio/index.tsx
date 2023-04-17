import { Fragment } from 'react';
import Head from 'next/head';
import Header from '../../components/header/header';
import { getAllProjects } from '@/lib/projectApi';
import Content from '@/interfaces/content';
import FilterPanel from '@/components/filter/filter-panel';

import StickyNavBar from '@/components/layout/sticky-nav-bar';

import MasonryGrid, { DataType } from '@/components/layout/masonry-grid';

type Props = {
	allProjects: Content[];
	uniqueTags: string[];
};

function PortfolioPage({ allProjects, uniqueTags }: Props) {
	return (
		<Fragment>
			<Head>
				<title>Yegor Chernyshev | Portfolio</title>
				<meta
					name='description'
					content='Various projects made by Yegor Chernyshev'
				/>
			</Head>
			<div className='max-w-6xl mx-auto min-h-screen'>
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
				<MasonryGrid type={DataType.Project} data={allProjects} />
			</div>
		</Fragment>
	);
}

export function getStaticProps() {
	const allProjects = getAllProjects([
		'slug',
		'createdDate',
		'editedDate',
		'title',
		'excerpt',
		'tags',
		'color',
		'coverImage',
		'authors',
	]);

	const tags = allProjects.map((project) => project['tags']).flat();
	const uniqueTags = Array.from(new Set(tags));

	return {
		props: { allProjects, uniqueTags },
	};
}

export default PortfolioPage;
