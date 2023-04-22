import { getAllPosts } from '@/lib/api';
import { Fragment, useState, useEffect } from 'react';
import Head from 'next/head';
import MasonryGrid, { DataType } from '@/components/layout/masonry-grid';
import FilterPanel from '@/components/filter/filter-panel';
import Header from '../../components/header/header';
import Content from '@/interfaces/content';
import StickyNavBar from '@/components/layout/sticky-nav-bar';
import { IPost, Post } from '@/lib/db-utils';
import { GetServerSideProps } from 'next';

type Props = {
	allPosts: Content[];
	// uniqueTags: string[];
};

function BlogPage({ allPosts /*uniqueTags*/ }: Props) {
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
				{/* <StickyNavBar>
					<FilterPanel options={uniqueTags} path={'blog'} />
				</StickyNavBar>
				*/}
				<MasonryGrid type={DataType.Post} data={allPosts} />
			</div>
		</Fragment>
	);
}

// export function getStaticProps() {
// 	const allPosts = getAllPosts([
// 		'slug',
// 		'createdDate',
// 		'editedDate',
// 		'title',
// 		'excerpt',
// 		'tags',
// 		'color',
// 		'coverImage',
// 		'authors',
// 	]);

// 	const tags = allPosts.map((post) => post['tags']).flat();
// 	const uniqueTags = Array.from(new Set(tags));

// 	return {
// 		props: { allPosts, uniqueTags },
// 	};
// }

export const getServerSideProps: GetServerSideProps<{ data: Data }> = async (
	context
) => {
	try {
		const res = await fetch('http://localhost:3000/api/blog');
		const data = await res.json();
		const posts = data.posts;
		console.log(posts[0].createdAt);

		// const tags = posts.map((post) => post['tags']).flat();
		// const uniqueTags = Array.from(new Set(tags));

		if (!data) {
			return {
				notFound: true,
			};
		}

		return {
			props: {
				allPosts: posts,
			},
		};
	} catch (err) {
		console.log(`Error: ${err}`);
	}
};

export default BlogPage;
