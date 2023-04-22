import Link from 'next/link';
import Image from 'next/image';
import Tag from '../portfolio/tag';
import Content from '@/interfaces/content';
import DateFormatter from '../layout/date-formatter';

type Props = {
	path: string;
	data: Content;
};

function FeaturedContentCard({ path, data }: Props) {
	return (
		<Link
			href={`/${path}/${data.title.split(' ').join('-').toLowerCase()}`}
			className='drop-shadow-2xl'
		>
			<div className='max-w-full rounded-xl overflow-hidden transition duration-500 hover:scale-105 bg-white dark:bg-black relative h-96 grid grid-cols-5 sm:grid-cols-4'>
				<Image
					src={data.coverImage.url}
					alt={'Blog post image'}
					width={1920}
					height={1080}
					className='absolute h-full w-full object-cover'
				/>
				<div className='sm:col-span-2'></div>
				<div className='z-50 p-5 col-span-4 sm:col-span-2'>
					<div className='flex flex-col h-full items-start justify-end drop-shadow-2xl bg-white rounded-xl p-5 gap-4'>
						<div className='flex flex-col gap-2'>
							<div className='flex flex-row gap-2'>
								{data.tags.map((tag, index) => (
									<Tag
										text={tag}
										color={data.color ? data.color : '#FFF'}
										key={index}
									/>
								))}
							</div>

							<h2 className='text-sm font-bold text-gray-500 dark:text-gray-500'>
								<DateFormatter dateString={data.createdAt} />
							</h2>
							<h1 className='font-bold text-black z-50 text-xl md:text-4xl'>
								{data.title}
							</h1>
							<p className='text-gray-800 text-sm'>
								{data.excerpt}
							</p>
						</div>
						<div
							className='flex flex-row gap-1 rounded-full p-1'
							style={{ backgroundColor: data.color }}
						>
							{data.authors.map((author, index) => (
								<div
									className='flex flex-row items-center gap-4 rounded-full p-1 backdrop-blur-md bg-black/20'
									key={index}
								>
									<a href={author.url}>
										<Image
											src={author.picture}
											alt={'Author Profile Image'}
											width={30}
											height={30}
											className='rounded-full bg-black aspect-square overflow-hidden '
										/>
									</a>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}

export default FeaturedContentCard;
