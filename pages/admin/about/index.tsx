import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import Head from 'next/head';
import { Fragment, useState } from 'react';

import Navbar from '@/components/navigation/nav-bar';
import SideBar from '@/components/navigation/side-bar';
import SectionContent from '@/interfaces/about';
import AboutCard from '@/components/content/about-card';
import type { GetServerSidePropsContext } from 'next';
import type { Session } from 'next-auth';

type Props = {
	allSections: SectionContent[];
	allSectionFilters: string[];
	session: Session;
};

function About({ allSections, allSectionFilters, session }: Props) {
	const [filteredContent, setFilteredContent] =
		useState<SectionContent[]>(allSections);
	const [filter, setFilter] = useState<string>('');

	function filterContent(type: string) {
		if (type === filter) {
			setFilter('');
		} else {
			const filteredContent = allSections.filter(
				(data) => data.page === type
			);
			setFilter(type);
			setFilteredContent(filteredContent);
		}
	}

	return (
		<Fragment>
			<Head>
				<title>Yegor Chernyshev | Skills</title>
				<meta name='description' content='Skills by Yegor Chernyshev' />
			</Head>
			<div className='p-4 md:p-10 mx-auto max-w-7xl bg-white rounded-lg'>
				<Navbar user={'Yegor'} />
				<div className='grid grid-cols-1 md:grid-cols-3 md:gap-10 mt-5'>
					<SideBar
						onClick={filterContent}
						filterOptions={allSectionFilters}
						newPath={'/admin/about/edit/new'}
					/>
					<div className='col-span-2'>
						<div className='flex flex-col gap-5'>
							{(filter === ''
								? allSections
								: filteredContent
							).map((section: SectionContent) => (
								<AboutCard
									section={section}
									path={'admin/about/edit'}
									key={section.title}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

import { loadAboutSections } from '@/lib/about-api';

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { sections, filterOptions } = await loadAboutSections();

	return {
		props: {
			allSections: sections,
			allSectionFilters: filterOptions,
			session: await getServerSession(
				context.req,
				context.res,
				authOptions
			),
		},
	};
}

export default About;
