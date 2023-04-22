import Link from 'next/link';
import Image from 'next/image';
import Tag from '../portfolio/tag';
import DateFormatter from '../layout/date-formatter';
import Content from '@/interfaces/content';

type Props = {
	path: string;
	data: Content;
	expanded?: boolean;
};

function ContentCard({ path, data, expanded = false }: Props) {
	return (
		<div className={expanded ? 'row-span-2' : 'row-span-1'}>
			{/* /${data.slug} */}
			<Link
				href={{
					pathname: `/${path}`,
					query: {
						slug: data.title.split(' ').join('-').toLowerCase(),
						type: data.type,
					},
				}}
				className='drop-shadow-2xl'
			>
				<div className='group h-auto max-w-full rounded-xl overflow-hidden transition duration-500 hover:scale-105 bg-white dark:bg-black relative drop-shadow-lg'>
					<div
						className={expanded ? 'h-96' : 'h-48 group-hover:h-96'}
					>
						<Image
							src={data.coverImage.url}
							alt={'Blog post image'}
							width={400}
							height={400}
							className='absolute h-full w-full object-cover'
						/>
						<div className='z-50 flex flex-col-reverse items-start p-5 justify-between h-full transition duration-500 group-hover:backdrop-blur-md group-hover:bg-black/40'>
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
													className='rounded-full aspect-square'
												/>
											</a>
										</div>
									))}
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
