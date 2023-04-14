import { getFilteredPosts } from '@/lib/api';
import { Fragment } from 'react';
import Head from 'next/head';
import MasonryGrid, { DataType } from '@/components/layout/masonry-grid';

import Header from '../../components/header/header';
import Content from '@/interfaces/content';
import FixedOverlay from '@/components/layout/fixed-overlay';
import FilterPanel from '@/components/filter/filter-panel';

type Props = {
	filteredPosts: Content[];
	filteredTag: string;
	allAvailableTags: string[];
};

function FilteredBlogPage({
	filteredPosts,
	filteredTag,
	allAvailableTags,
}: Props) {
	return (
		<Fragment>
			<Head>
				<title>Yegor Chernyshev | Blog</title>
				<meta
					name='description'
					content={`Blog posts for the ${filteredTag} tag by Yegor Chernyshev`}
				/>
			</Head>
			<div className='max-w-6xl mx-auto min-h-screen'>
				<Header
					title={
						<h1>
							B
							<span className='font-mono text-gray-400 dark:text-[#9D6D9A]'>
								log(n)
							</span>
						</h1>
					}
					subtitle={'the ramblings of a madman'}
					filterTags={allAvailableTags}
				/>

				{filteredPosts.length < 1 ? (
					<FixedOverlay>
						<h1 className='font-bold text-2xl'>Oh No! 🛸</h1>
						<h4 className='text-gray-500'>
							No posts were found for the{' '}
							<span className='font-bold'>{filteredTag}</span>{' '}
							tag. Please select one of the filters above in the
							header.
						</h4>
					</FixedOverlay>
				) : (
					<MasonryGrid type={DataType.Post} data={filteredPosts} />
				)}
			</div>
		</Fragment>
	);
}

type Params = {
	params: {
		slug: string;
	};
};

export async function getServerSideProps({ params }: Params) {
	const filteredData = params.slug;
	const filteredTag: string = filteredData[0];
	const { response, allTags } = await getFilteredPosts(filteredTag);

	return {
		props: {
			filteredPosts: response,
			filteredTag: filteredTag,
			allAvailableTags: allTags,
		},
	};
}

export default FilteredBlogPage;
