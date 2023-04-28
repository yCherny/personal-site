'use client';

import { Fragment, useState } from 'react';
import MasonryGrid, { DataType } from '@/components/layout/masonry-grid';
import FilterPanel from '@/components/filter/filter-panel';
import Header from '../../components/header/header';
import Content from '@/interfaces/content';
import StickyNavBar from '@/components/layout/sticky-nav-bar';

type Props = {
	allPosts: Content[];
	uniqueTags: string[];
};

function BlogPage({ allPosts, uniqueTags }: Props) {
	const [filteredContent, setFilteredContent] = useState<Content[]>(allPosts);
	const [filter, setFilter] = useState<string>('');

	function filterContent(type: string) {
		if (type === filter) {
			setFilter('');
		} else {
			const filteredContent = allPosts.filter((data) =>
				data.tags.includes(type)
			);
			setFilter(type);
			setFilteredContent(filteredContent);
		}
	}

	return (
		<Fragment>
			<div className='max-w-6xl mx-auto min-h-screen'>
				<Header
					titlePrimary={'B'}
					titleSecondary={'log(n)'}
					subtitle={'the ramblings of a madman'}
				/>
				<StickyNavBar>
					<FilterPanel
						onClick={filterContent}
						filterOptions={uniqueTags}
						path={'blog'}
					/>
				</StickyNavBar>
				<MasonryGrid
					type={DataType.Post}
					data={filter === '' ? allPosts : filteredContent}
				/>
			</div>
		</Fragment>
	);
}

export default BlogPage;
