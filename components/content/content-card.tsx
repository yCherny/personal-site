import Link from 'next/link';
import Image from 'next/image';
import Tag from './tag';
import DateFormatter from '../layout/date-formatter';
import Content from '@/interfaces/content';
import AuthorTag from './author-tag';
import { useState } from 'react';

type Props = {
	path: string;
	data: Content;
	compressed?: boolean;
	featured?: boolean;
};

function ContentCard({
	path,
	data,
	compressed = false,
	featured = false,
}: Props) {
	const [loading, setLoading] = useState(false);
	return (
		<div
			className={`${compressed ? 'row-span-2' : 'row-span-1'} ${
				featured ? 'md:col-span-3' : 'col-span-1'
			}`}
		>
			<Link
				href={`/${path}/${data.slug}`}
				className='drop-shadow-2xl'
				onClick={() => {
					setLoading(true);
				}}
			>
				<div className='group h-auto max-w-full rounded-xl overflow-hidden transition duration-500 hover:scale-105 bg-white dark:bg-black relative drop-shadow-lg'>
					<div
						className={
							compressed
								? 'h-96 md:h-48 sm:group-hover:h-96'
								: 'h-96'
						}
					>
						<Image
							src={data.coverImage.url}
							alt={'Blog post image'}
							width={400}
							height={400}
							className='absolute h-full w-full object-cover'
						/>
						<div className='z-50 flex stretch flex-col-reverse items-start p-5 justify-between h-full w-full transition duration-500 group-hover:backdrop-blur-md group-hover:bg-black/40'>
							<div className='flex flex-col items-start gap-2'>
								<div className='flex flex-row gap-2 hidden group-hover:flex'>
									{data.tags.map((tag, index) => (
										<Tag
											text={tag}
											color={
												data.color ? data.color : '#FFF'
											}
											key={index}
										/>
									))}
								</div>
								{data.type === 'blog' && (
									<div className='hidden group-hover:flex text-white'>
										<DateFormatter
											dateString={data.createdAt}
										/>
									</div>
								)}
								<h1 className='text-4xl font-bold text-white z-50'>
									{data.title}
								</h1>
								<p className='text-gray-400 hidden group-hover:flex'>
									{data.excerpt}
								</p>
								<div
									className='flex flex-row gap-1 rounded-full p-1 hidden group-hover:flex'
									style={{ backgroundColor: data.color }}
								>
									{data.authors.map((author, index) => (
										<AuthorTag
											authorName={author.name}
											authorPicture={author.picture}
											key={index}
										/>
									))}
								</div>
								<div className='absolute top-5 right-5'>
									{loading && (
										<Image
											src={'/assets/tail-spin.svg'}
											alt='loading indicator'
											height={20}
											width={20}
										/>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
}

export default ContentCard;
