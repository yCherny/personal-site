import Content from '@/interfaces/content';
import ContentCard from '../content/content-card';

type Props = {
	content: Content[];
};

export default function DataFlow({ content }: Props) {
	return (
		<div className='flex flex-col gap-5'>
			{content &&
				content.map((d: Content) => (
					<ContentCard
						path={`admin/uploads/edit`}
						data={d}
						key={d.slug}
					/>
				))}
		</div>
	);
}
