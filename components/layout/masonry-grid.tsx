import Content from '@/interfaces/content';
import ContentCard from '../content/content-card';
import FeaturedContentCard from '../content/featured-content-card';

export enum DataType {
	Project,
	Post,
}

type Props = {
	type: DataType;
	data: Content[];
};

export default function MasonryGrid({ type, data }: Props) {
	return (
		<div className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:mt-5 mb-28 '>
			{data.map((d: any, postIndex) =>
				postIndex === 0 ? (
					<div
						className='col-span-1 sm:col-span-2 md:col-span-3'
						key={postIndex}
					>
						<FeaturedContentCard
							path={type === DataType.Post ? 'blog' : 'portfolio'}
							data={data[0]}
						/>
					</div>
				) : (
					<ContentCard
						path={type === DataType.Post ? 'blog' : 'portfolio'}
						data={d}
						expanded={postIndex !== 0 && postIndex !== 2}
						key={postIndex}
					/>
				)
			)}
		</div>
	);
}
