import Content from '@/interfaces/content';
import ContentCard from '../content/content-card';

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
		<div className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 mt-5 mb-28 '>
			{data.map((d: any, postIndex) => (
				<ContentCard
					key={d.slug}
					path={type === DataType.Post ? 'blog' : 'portfolio'}
					data={d}
					compressed={postIndex === 2}
					featured={postIndex === 0}
				/>
			))}
		</div>
	);
}
