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
					<FilterPanel options={uniqueTags} path={'blog'} />
				</StickyNavBar>
				<MasonryGrid type={DataType.Post} data={allPosts} />
			</div>
		</Fragment>
	);
}

export const getServerSideProps: GetServerSideProps<{ data: Data }> = async (
	context
) => {
	const res = await fetch('http://localhost:3000/api/blog');
	const data = await res.json();
	const posts: Content[] = data.posts;

	const tags = posts.map((post) => post.tags).flat();
	const uniqueTags = Array.from(new Set(tags));

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
};

export default BlogPage;
