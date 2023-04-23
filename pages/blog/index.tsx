import { Fragment, useState, useEffect } from 'react';
import Head from 'next/head';
import MasonryGrid, { DataType } from '@/components/layout/masonry-grid';
import FilterPanel from '@/components/filter/filter-panel';
import Header from '../../components/header/header';
import Content from '@/interfaces/content';
import StickyNavBar from '@/components/layout/sticky-nav-bar';
import { GetServerSideProps } from 'next';

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
			<Head>
				<title>Yegor Chernyshev | Blog</title>
				<meta
					name='description'
					content='Various posts by Yegor Chernyshev'
				/>
			</Head>
			<div className='max-w-6xl mx-auto min-h-screen'>
				<Header
					title={
						<h1>
							B
							<span className='text-gray-400 dark:text-[#A59DB9]'>
								log(n)
							</span>
						</h1>
					}
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

import { loadBlog } from '@/lib/blog-api';

export async function getStaticProps() {
	const { posts, uniqueTags } = await loadBlog();

	if (!posts) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			allPosts: posts,
			uniqueTags: uniqueTags,
		},
	};
}

export default BlogPage;
