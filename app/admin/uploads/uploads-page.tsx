'use client';

import Head from 'next/head';
import { Fragment, useState } from 'react';

import Navbar from '@/components/navigation/nav-bar';
import SideBar from '@/components/navigation/side-bar';
import DataFlow from '@/components/layout/data-flow';
import Content from '@/interfaces/content';

import type { Session } from 'next-auth';

type Props = {
	allContent: Content[];
	allContentFilters: string[];
	session: Session | null;
};

function Uploads({ allContent, allContentFilters, session }: Props) {
	const [filteredContent, setFilteredContent] =
		useState<Content[]>(allContent);
	const [filter, setFilter] = useState<string>('');

	function filterContent(type: string) {
		if (type === filter) {
			setFilter('');
		} else {
			const filteredContent = allContent.filter(
				(data) => data.type === type
			);
			setFilter(type);
			setFilteredContent(filteredContent);
		}
	}

	return (
		<Fragment>
			<Head>
				<title>Yegor Chernyshev | Uploads</title>
				<meta
					name='description'
					content='Uploads by Yegor Chernyshev'
				/>
			</Head>
			<div className='p-4 md:p-10 mx-auto max-w-7xl bg-white rounded-lg'>
				<Navbar user={'Jimmy'} />
				<div className='grid grid-cols-1 md:grid-cols-3 md:gap-10 mt-5'>
					<SideBar
						onClick={filterContent}
						filterOptions={allContentFilters}
						newPath={'/admin/uploads/edit/new'}
					/>
					<div className='col-span-2'>
						<DataFlow
							content={
								filter === '' ? allContent : filteredContent
							}
						/>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default Uploads;
